(function (){
//função anónima

  var app = angular.module('app', ['ionic','angularMoment']);


  //definir controlador dos mapas
  app.controller('MapController', function($http, $scope) {

  $scope.maps = [];

  $http.get('http://www.civr.pt/category/mapas2015/?json=1')
  .success(function(response) {
    angular.forEach(response.posts, function(post){
      $scope.maps.push(post);

    });
  });


$scope.openLink = function(url){

  window.open(url,'_blank');

};
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
  });

 //definir controlador das news
   app.controller('NewsController', function($http, $scope) {

  

  $scope.news = [];
  $scope.page=1;
  $scope.pagesLoaded=0;
  $scope.noMoreItemsAvailable = false;

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
    $scope.openLink = function(url){

    window.open(url,'_blank');

  };
  });


    //definir controlador das news
   app.controller('ContactsController', function($scope) {


    $scope.googleMaps = 'http://www.google.pt/maps/place/Av.+Carvalho+Ara%C3%BAjo+7,+5000-651+Vila+Real/@41.2948537,-7.7463567,17z/data=!3m1!4b1!4m2!3m1!1s0xd3b4b06ba992451:0x1bf6f7bd29f595df?hl=en';
    $scope.civrTwitter = 'http://twitter.com/CIVROFICIAL';
    $scope.civrFacebook = 'http://www.facebook.com/Circuito.Internacional.de.Vila.Real.Oficial';
    $scope.civrInstagram = 'http://instagram.com/circuitovilareal/';


    $scope.openLink = function(url){

    window.open(url,'_blank','location=yes');

  };
  });

     //definir controlador do feed de instagram
  app.controller('CivrInstagramController', function($http, $scope) {

     $scope.photos = [];
     $scope.userPhoto= 0;
     $scope.photoUserReady = 0;

      $http.get("https://api.instagram.com/v1/tags/circuitovilareal/media/recent?access_token=1368360108.119d058.c88a3bdad63f4c6e923eb96b9db732df")
      .success(function(response) {

        angular.forEach(response.data, function(photo){
          $scope.photos.push(photo);
         





        });
      });
});

   




//passar o nosso config que utiliza stateprovider e urlrouterprovider utilizados para nav
  app.config(function($stateProvider, $urlRouterProvider){
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
    $stateProvider.state('maps', {

      url: '/maps',
      views: {
        //queremos mm esta nav
        'tab-home': {
          templateUrl:'templates/maps.html',
          controller:'MapController'
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
          templateUrl:'templates/schedule.html'
        }

      }
      
    });

     //definir state para o home.schedule view
    $stateProvider.state('access', {

      url: '/access',
      views: {
        //queremos mm esta nav
        'tab-home': {
          templateUrl:'templates/access.html'
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
  });
});
}());
