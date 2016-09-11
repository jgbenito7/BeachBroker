var app = angular.module("beachBroker", ["ngRoute","ngCookies"]);

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
        isLogin: true
    }).when("/dashboard", {
        templateUrl : "templates/dashboard-properties.html",
        isLogin: true
    }).otherwise({
      redirectTo: '/'
    });
});

app.run(function($rootScope,$cookies) {


    $rootScope.baseUrl = "http://localhost:8080";

    $rootScope.userToken = $cookies.get("userToken");

    $rootScope.$on('$routeChangeStart', function (event, next) {
        if($rootScope.userToken){
          var userAuthenticated = true;
        }

        if (!userAuthenticated && next.isLogin) {
            /* You can save the user's location to take him back to the same page after he has logged-in */
            //$rootScope.savedLocation = location.url();
            window.location.href = "#/login";
            //$location.path('#/login');
        }
    });

    console.log($rootScope.userToken);

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
      location.reload();
      //window.location.reload(true);
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
})
.controller('loginCtrl', function($scope, $rootScope, $http, $cookies) {
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '692544747562130',
      xfbml      : true,
      version    : 'v2.6'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

   $(document).ready(function(){
     $("#register").click(function(){
       $('#myModal').modal('show');
     });
   });

   $scope.userAuthenticate= function () {
           // use $.param jQuery function to serialize data from JSON
            var data = $.param({
                email: $scope.userEmail,
                password: $scope.userPassword
            });

            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

            $http.post($rootScope.baseUrl + "/users/authorize", data, config)
            .success(function (data, status, headers, config) {
                console.log("Login Success");
                //Set rootScope and Cookie to token
                $cookies.put("userToken", data['token']);
                $rootScope.userToken = $cookies.get("userToken");
                window.location.href = "#/dashboard";
            })
            .error(function (data, status, header, config) {
                console.log("Error");
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
                console.log($scope.ResponseDetails);
            });
  };

  $scope.createUser = function () {
          // use $.param jQuery function to serialize data from JSON

          if($scope.userCreateEmail.length > 0 &&
             $scope.userFirstName.length > 0 &&
             $scope.userLastName.length > 0 &&
             $scope.userCreatePassword.length > 0 &&
             $scope.userConfirmPassword.length > 0 &&
             ($scope.userCreatePassword == $scope.userConfirmPassword)
           ){
             var data = $.param({
                 email: $scope.userCreateEmail,
                 password: $scope.userCreatePassword,
                 firstName: $scope.userFirstName,
                 lastName: $scope.userLastName
             });

             var config = {
                 headers : {
                     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                 }
             }

             $http.post($rootScope.baseUrl + "/users", data, config)
             .success(function (data, status, headers, config) {
               //Set rootScope and Cookie to token
               $cookies.put("userToken", data['token']);
               $rootScope.userToken = $cookies.get("userToken");
               window.location.href = "#/dashboard";
             })
             .error(function (data, status, header, config) {
                 console.log("Error");
                 $scope.ResponseDetails = "Data: " + data +
                     "<hr />status: " + status +
                     "<hr />headers: " + header +
                     "<hr />config: " + config;
                 console.log($scope.ResponseDetails);
             });
           }else{
             console.log("invalid params");
           }

  };

});
