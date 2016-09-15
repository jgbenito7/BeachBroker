var app = angular.module("beachBroker", ["ngRoute","ngCookies","ngAnimate",'bcherny/formatAsCurrency', 'vsGoogleAutocomplete']);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "templates/main.html",
        controller : "mainCtrl"
    }).when("/login", {
        templateUrl : "templates/dashboard-login.html",
        controller: "loginCtrl"
    }).when("/properties", {
        templateUrl : "templates/properties-map.html",
        controller : "propertySearchCtrl"
    }).when("/single-property/:propId", {
        templateUrl : "templates/properties-detail-standard.html",
        controller : "singlePropertyCtrl"
    }).when("/submit", {
        templateUrl : "templates/properties-submit.html",
        controller : "submitCtrl",
        isLogin: true
    }).when("/dashboard", {
        templateUrl : "templates/dashboard-properties.html",
        controller : "dashboardCtrl",
        isLogin: true
    }).otherwise({
      redirectTo: '/'
    });
});

app.run(function($rootScope,$cookies,$route,$location) {


    $rootScope.baseUrl = "http://localhost:8080";

    $rootScope.serverUrl = "http://localhost:8888/Beach%20Broker%20Server";

    $rootScope.imageUrl = "/images/listings/";

    //I may need to do some kind of session thing here if user disables cookies
    $rootScope.userToken = $cookies.get("userToken");

    $rootScope.$on('$routeChangeStart', function (event, next) {
        if($rootScope.userToken){
          var userAuthenticated = true;
        }

        if (!userAuthenticated && next.isLogin) {
            $location.path('login');
        }
    });

    //console.log($rootScope.userToken);

    $rootScope.navStructure = {
      logoName: "BeachBroker.com",
      navOne: "Buy",
      liOne: [
        { link:"#properties", text:"Properties For Sale"},
        { link:"#properties", text:"Properties Coming Soon" }
      ],
      navTwo: "Sell",
      liTwo: [
        { link:"#properties", text:"For Sale By Owner"},
        { link:"#properties", text:"For Sale By Agent" }
      ],
      navThree: "Admin",
      liThree: [
        { link:"#dashboard", text:"My Dashboard"},
        { link:"none", text:"Logout" }
      ],
    };

    //Log a user out
    $rootScope.logout = function () {
      $cookies.remove("userToken");
      //$route.reload();
      window.location.reload(true);
    };


})
.controller('mainCtrl', function($scope, $rootScope) {
  $.getScript('assets/js/villareal.js', function(){});
})
.controller('propertySearchCtrl', function($scope, $rootScope) {
  $.getScript('assets/js/villareal.js', function(){});
})
.controller('singlePropertyCtrl', function($scope, $rootScope) {
  $.getScript('assets/js/villareal.js', function(){});
});
