var app = angular.module("beachBroker", ["ngRoute","ngCookies","ngAnimate",'bcherny/formatAsCurrency', 'vsGoogleAutocomplete','angularUtils.directives.dirPagination','facebook']);

app.config(function($routeProvider, $logProvider, FacebookProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "templates/main.html",
        controller : "mainCtrl"
    }).when("/login", {
        templateUrl : "templates/dashboard-login.html",
        controller: "loginCtrl"
    }).when("/properties/:parameters?", {
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
    }).when("/my-profile", {
        templateUrl : "templates/dashboard-myprofile.html",
        controller : "myprofileCtrl",
        isLogin: true
    }).when("/edit-profile", {
        templateUrl : "templates/dashboard-editprofile.html",
        controller : "editprofileCtrl",
        isLogin: true
    }).otherwise({
      redirectTo: '/'
    });

    $logProvider.debugEnabled(true);

    FacebookProvider.init('692544747562130');
});

app.run(function($rootScope,$cookies,$route,$location,$window) {

    $rootScope.baseUrl = "http://localhost:8080";

    $rootScope.serverUrl = "http://localhost:8888/Beach%20Broker/Beach%20Broker%20Server";

    $rootScope.imageUrl = "/images/listings/";

    //I may need to do some kind of session thing here if user disables cookies
    $rootScope.userToken = $cookies.get("userToken");

    $rootScope.config = {
        headers : {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
        }
    }

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
      $cookies.remove("userEmail");
      //$route.reload();
      window.location.reload(true);
    };

})
.controller('mainCtrl', function($scope, $rootScope, $location, $route) {
  $.getScript('assets/js/villareal.js', function(){});


  console.log("loaded");

  $scope.address= {
    streetNumber: '',
    streetName: '',
    city: '',
    state: '',
    country: ''
  };

  $scope.search = function(){

    //urlString = urlString.substring(0, urlString.length - 1);
    var urlString = $scope.address['streetNumber'] + "?" +
                         $scope.address['streetName'] + "?" +
                         $scope.address['city'] + "?" +
                         $scope.address['state'] + "?" +
                         $scope.address['country'];

        //urlString = urlString.replace(/ /g,"%20");
                         //console.log('properties/' + urlString);
    $location.path('properties/' + urlString);
    $route.reload();
    //$location.path('properties/' +);

  }




});
