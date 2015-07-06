(function (){
//função anónima

  var app = angular.module('app', ['ionic','angularMoment']);

app.factory('PhotoService', function($http, $q) {
    var BASE_URL = "https://api.instagram.com/v1/tags/circuitovilareal/media/recent?access_token=1368360108.119d058.c88a3bdad63f4c6e923eb96b9db732df&callback=JSON_CALLBACK";
    var items = [];
     var nextUrl = 0;  // next max tag id - for fetching older photos
    var NewInsta = 0; // min tag id - for fetching newer photos

    return {
      GetFeed: function() {
        return $http.jsonp(BASE_URL).then(function(response) {

          items = response.data.data;
          nextUrl = response.data.pagination.next_max_tag_id;
          NewInsta = response.data.pagination.min_tag_id;
          

          return items;

        });
      },
      GetNewPhotos: function() {
        return $http.jsonp(BASE_URL + '&min_tag_id=' + NewInsta).then(function(response) {

          items = response.data.data;
          if(response.data.data.length > 0){
            NewInsta = response.data.pagination.min_tag_id;
          }

          return items;

        });
      },
      
      /**
       * Always returns a promise object. If there is a nextUrl, 
       * the promise object will resolve with new instragram results, 
       * otherwise it will always be resolved with [].
       **/
      GetOldPhotos: function() {
        if (typeof nextUrl != "undefined") {
          return $http.jsonp(BASE_URL + '&max_tag_id=' + nextUrl).then(function(response) {
  
            if(response.data.data.length > 0){
              nextUrl = response.data.pagination.next_max_tag_id;
            }
            
            items = response.data.data;
  
  
            return items;
  
          });
        } else {
          var deferred = $q.defer();
          deferred.resolve([]);
          return deferred.promise;
        }
      }
      
    }
  });



//definir controlador dos horarios
app.controller('scheduleController', function($http, $scope, $ionicModal) {




$scope.data = {};
$scope.schedules = [];

$http.get('http://www.civr.pt/category/app-horarios-2015/?json=1')
  .success(function(response) {
    angular.forEach(response.posts, function(post){
      $scope.schedules.push(post);

    });
  });


$ionicModal.fromTemplateUrl('templates/scheduleModal.html', function(modal) {
    $scope.gridModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-right'
  });
  // open video modal
  $scope.openModal = function(selected) {
    $scope.data.selected = selected.thumbnail_images.large.url;
    $scope.data.title = selected.title;
    $scope.data.content = selected.content;
    $scope.gridModal.show();
   
   


  };
  // close video modal
  $scope.closeModal = function() {
    $scope.gridModal.hide();
  };
  //Cleanup the video modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.gridModal.remove();
  });
});







   


  //definir controlador dos mapas
  app.controller('MapsController', function($http, $scope, $ionicModal) {
  $scope.data = {};
  $scope.maps = [];

  $http.get('http://www.civr.pt/category/mapas2015/?json=1')
  .success(function(response) {
    angular.forEach(response.posts, function(post){
      $scope.maps.push(post);

    });
  });

 $ionicModal.fromTemplateUrl('templates/mapModal.html', function(modal) {
    $scope.gridModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-right'
  });
  // open video modal
  $scope.openModal = function(selected) {
    $scope.data.selected = selected.thumbnail_images.large.url;
    $scope.data.title = selected.title;
    $scope.data.content = selected.content;

    $scope.gridModal.show();
    


  };
  // close video modal
  $scope.closeModal = function() {
    $scope.gridModal.hide();
  };
  //Cleanup the video modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.gridModal.remove();
  });
});




  //definir controlador dos alojamentos
  app.controller('LodgingController', function($http, $scope) {

    $scope.page=1;
    $scope.lodgings=[];
    $scope.pagesLoaded=0;
    $scope.noMoreItemsAvailable = false;
     

    $scope.loadMoreLodgings = function (){

    if ($scope.lodgings.length>0){
      $scope.page = $scope.page + 1;
      $scope.pagesLoaded = $scope.pagesLoaded+1;

    }
    $http.get('http://www.civr.pt/category/app-alojamento/?json=get_recent_posts&page='+$scope.page)
    .success(function(response){
      angular.forEach(response.posts, function(post) {


        $scope.lodgings.push(post);

      });
    

      if($scope.pagesLoaded >= response.pages){

        $scope.noMoreItemsAvailable=true;
      }
      
      $scope.$broadcast('scroll.infiniteScrollComplete');
      
});
  };
});

//definir controlador dos restaurantes
  app.controller('RestaurantController', function($http, $scope) {

  

  $scope.restaurants = [];
  $scope.page=1;
  $scope.pagesLoaded=0;
  $scope.noMoreItemsAvailable = false;

  $scope.loadMoreRestaurants = function (){

    if ($scope.restaurants.length>0){
      $scope.page = $scope.page + 1;
      $scope.pagesLoaded = $scope.pagesLoaded+1;

    }
    $http.get('http://www.civr.pt/category/app-restaurantes/?json=get_recent_posts&page='+$scope.page)
    .success(function(response){
       

      angular.forEach(response.posts, function(post) {
        $scope.restaurants.push(post);

      });

     

      if($scope.pagesLoaded >= response.pages){

        $scope.noMoreItemsAvailable=true;
      }
      
      $scope.$broadcast('scroll.infiniteScrollComplete');
      
});




    };
     
     $scope.openLink = function(url){

      window.open(url,'_system','location: yes');

  };
  });


 //definir controlador das news
   app.controller('NewsController', function($http, $scope, $ionicModal) {
  
  $scope.news = [];
  $scope.page=1;
  $scope.pagesLoaded=0;
  $scope.noMoreItemsAvailable = false;
  $scope.data = {};

  $scope.loadMoreNews = function (){

    if ($scope.news.length>0){
      $scope.page = $scope.page + 1;
      $scope.pagesLoaded = $scope.pagesLoaded+1;
    }

    $http.get('http://www.civr.pt/category/app-noticias/?json=get_recent_posts&page='+$scope.page)
    .success(function(response){

      angular.forEach(response.posts, function(post) {
        $scope.news.push(post);

      });

      if($scope.pagesLoaded >= response.pages){
        $scope.noMoreItemsAvailable=true;
      }
      
      $scope.$broadcast('scroll.infiniteScrollComplete');
      
});




    };


    $ionicModal.fromTemplateUrl('templates/noticiaModal.html', function(modal) {
    $scope.gridModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-right'
  });
  // open video modal
  $scope.openModal = function(selected) {
    $scope.data.selected = selected.thumbnail_images.large.url;
    $scope.data.title = selected.title;
    $scope.data.content = selected.content;
    $scope.data.newsDate = selected.date;
    
    $scope.gridModal.show();


  };
  // close video modal
  $scope.closeModal = function() {
    $scope.gridModal.hide();
  };
  //Cleanup the video modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.gridModal.remove();
  });

   
  });


    //definir controlador dos contactos
   app.controller('ContactsController', function($scope) {


     $scope.navigate=function(lat, lng) {
    // If it's an iPhone..
    if ((navigator.platform.indexOf("iPhone") !== -1) || (navigator.platform.indexOf("iPod") !== -1)) {
      function iOSversion() {
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
          // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
          var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
          return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
        }
      }
      var ver = iOSversion() || [0];

      if (ver[0] >= 6) {
        protocol = 'maps://';
      } else {
        protocol = 'http://';

      }
      window.location = protocol + 'maps.apple.com/maps?daddr=' + lat + ',' + lng + '&amp;ll=';
    }
    else {
      window.open('http://maps.google.com?daddr=' + lat + ',' + lng + '&amp;ll=', '_blank','location=no');
    }
  }


    
    $scope.civrTwitter = 'http://twitter.com/CIVROFICIAL';
    $scope.civrFacebook = 'http://www.facebook.com/Circuito.Internacional.de.Vila.Real.Oficial';
    $scope.civrInstagram = 'http://instagram.com/circuitovilareal/';


    $scope.openLink = function(url){

    window.open(url,'_blank','location=yes');

  };
  });


//definir controlador das bancadas
app.controller('bancadasController', function($http, $scope, $ionicModal) {

$scope.data = {};
$scope.bancadas = [];

$http.get('http://www.civr.pt/category/app-bancadas/?json=1')
  .success(function(response) {
    angular.forEach(response.posts, function(post){
      $scope.bancadas.push(post);

    });
  });





$ionicModal.fromTemplateUrl('templates/bancadaModal.html', function(modal) {
    $scope.gridModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-right'
  });
  // open video modal
  $scope.openModal = function(selected) {
    $scope.data.selected = selected.thumbnail_images.large.url;
    $scope.data.title = selected.title;
    $scope.data.content = selected.content;
    if (typeof selected.custom_fields.client_position != "undefined" && selected.custom_fields.client_name != "undefined") {
    $scope.data.lat = selected.custom_fields.client_position.toString();
    $scope.data.lng = selected.custom_fields.client_name.toString();
    }
    $scope.gridModal.show();


  };
  // close video modal
  $scope.closeModal = function() {
    $scope.gridModal.hide();
  };
  //Cleanup the video modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.gridModal.remove();
  });







   $scope.navigate=function(lat, lng) {
    // If it's an iPhone..
    if ((navigator.platform.indexOf("iPhone") !== -1) || (navigator.platform.indexOf("iPod") !== -1)) {
      function iOSversion() {
        if (/iP(hone|od|ad)/.test(navigator.platform)) {
          // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
          var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
          return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
        }
      }
      var ver = iOSversion() || [0];

      if (ver[0] >= 6) {
        protocol = 'maps://';
      } else {
        protocol = 'http://';

      }
      window.location = protocol + 'maps.apple.com/maps?daddr=' + lat + ',' + lng + '&amp;ll=';
    }
    else {
      window.open('http://maps.google.com?daddr=' + lat + ',' + lng + '&amp;ll=', '_blank','location=yes');
    }
  }


});





 app.controller('CivrInstagramController', function($scope, $timeout, PhotoService) {
    $scope.items = [];
    $scope.newItems = [];
    $scope.noMoreItemsAvailable = false;

    PhotoService.GetFeed().then(function(items) {

      $scope.items = items.concat($scope.items);


    });

    $scope.doRefresh = function() {
      if ($scope.newItems.length > 0) {
        $scope.items = $scope.newItems.concat($scope.items);

        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');

        $scope.newItems = [];
      } else {
        PhotoService.GetNewPhotos().then(function(items) {


          $scope.items = items.concat($scope.items);

          //Stop the ion-refresher from spinning
          $scope.$broadcast('scroll.refreshComplete');
        });
      }
    };
    $scope.loadMore = function() {
      PhotoService.GetOldPhotos().then(function(items) {

        $scope.items = $scope.items.concat(items);

        $scope.$broadcast('scroll.infiniteScrollComplete');
        
        // an empty array indicates that there are no more items
        if (items.length === 0) {
          $scope.noMoreItemsAvailable = true;
        }

      });
    };

    var CheckNewItems = function(){
    $timeout(function(){
      PhotoService.GetNewPhotos().then(function(items){
        $scope.newItems = items.concat($scope.newItems);
      
        CheckNewItems();
      });
    },30000);
   }
  
  CheckNewItems();


  });




//passar o nosso config que utiliza stateprovider e urlrouterprovider utilizados para nav
  app.config(function($stateProvider, $urlRouterProvider, $compileProvider, $ionicConfigProvider){

    $ionicConfigProvider.tabs.position('bottom');


    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|tel|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content):|data:image\//);
//definir state para o home view
    $stateProvider.state('home', {

      url: '/home',
      views: {
        'tab-home': {
          templateUrl:'templates/home.html'
        }

      }
      
    });
    //definir state para o home.maps view
    $stateProvider
    .state('maps', {
      url: '/maps',
      views: {
        //queremos mm esta nav
        'tab-home': {
          templateUrl:'templates/maps.html',
          controller:'MapsController'
        }

      } 
    });


    //definir state para o home.instacivrfeed view
    $stateProvider.state('instacivrfeed', {

      url: '/instacivrfeed',
      views: {
        //queremos mm esta nav
        'tab-home': {
          templateUrl:'templates/instacivrfeed.html',
          controller:'CivrInstagramController'
        }

      }
      
    });

    //definir state para o home.schedule view
    $stateProvider.state('schedule', {

      url: '/schedule',
      views: {
        //queremos mm esta nav
        'tab-home': {
          templateUrl:'templates/schedule.html',
          controller:'scheduleController'
        }

      }
      
    });

     //definir state para o home.access view
    $stateProvider.state('access', {

      url: '/access',
      views: {
        //queremos mm esta nav
        'tab-home': {
          templateUrl:'templates/access.html'
        }

      }
      
    });

    //definir state para o home.access.bancadas view
    $stateProvider.state('bancadas', {

      url: '/bancadas',
      views: {
        //queremos mm esta nav
        'tab-home': {
          templateUrl:'templates/bancadas.html',
          controller:'bancadasController'
        }

      }
      
    });

    //definir state para o home.news view
    $stateProvider.state('news', {

      url: '/news',
      views: {
        //queremos mm esta nav
        'tab-home': {
          templateUrl:'templates/news.html',
          controller:'NewsController'
        }

      }
      
    });
//definir state para o info view
    $stateProvider.state('info', {

      url: '/info',
      views: {
        //queremos mm esta nav
        'tab-info': {
          templateUrl:'templates/info.html'
        }

      }
      
    });
      //definir state para o info.alojamento view
      $stateProvider.state('lodging', {

      url: '/lodgings',
      views: {
        //queremos mm esta nav
        'tab-info': {
          templateUrl:'templates/lodgings.html',
          controller:'LodgingController'
        }

      }
      
    });


      //definir state para o info.restaurant view
      $stateProvider.state('restaurants', {

      url: '/restaurants',
      views: {
        //queremos mm esta nav
        'tab-info': {
          templateUrl:'templates/restaurants.html',
          controller:'RestaurantController'
        }

      }
      
    });

  //definir state para o info.apcivr view
      $stateProvider.state('apcivr', {

      url: '/apcivr',
      views: {
        //queremos mm esta nav
        'tab-info': {
          templateUrl:'templates/apcivr.html',
          controller:'ContactsController'
        
        }

      }
      
    });     

//definir state para o results view
    $stateProvider.state('results', {

      url: '/results',
      views: {
        'tab-results': {
          templateUrl:'templates/results.html'
        }

      }
    });
//se nao houver correspondencia de state muda o state para /home view
    $urlRouterProvider.otherwise('/home');
  });


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.cordova && window.cordova.InAppBrowser){

      window.open = window.cordova.InAppBrowser.open;
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
              document.addEventListener("offline", function(){

               alert("Por favor, ligue o seu dispositivo à internet para aceder a todos os conteúdos!")


              });
             
  });
});
}());
