var app = angular.module("beachBroker", ["ngRoute"]);

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
    }).otherwise({
      redirectTo: '/'
    });
});

app.run(function($rootScope) {
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
        { link:"#login", text:"Login"},
        { link:"#login", text:"Logout" }
      ],
    };
})
.controller('mainCtrl', function($scope, $rootScope) {
  $.getScript('assets/js/villareal.js', function(){});
})
.controller('propertySearchCtrl', function($scope, $rootScope) {
  $.getScript('assets/js/villareal.js', function(){});
})
.controller('loginCtrl', function($scope, $rootScope) {
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

     $("#login").click(function(){

     });
   })






  //$.getScript('assets/js/villareal.js', function(){});
});
