app.controller('loginCtrl', function($scope, $rootScope, $http, $cookies, usersFactory) {
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
      console.log("Authenticating user");
      // use $.param jQuery function to serialize data from JSON
      var data = $.param({
          email: $scope.userEmail,
          password: $scope.userPassword
      });

      usersFactory.authorizeUser(data,$rootScope.config).then(function(data){
        data = data['data'];
        if(data['loggedIn']){
          $cookies.put("userToken", data['token']);
          $cookies.put("userEmail", $scope.userEmail);
          $rootScope.userToken = $cookies.get("userToken");
          window.location.href = "#/dashboard";
        }else{
          console.log("Login Failed...");
          console.log(data);
        }
      });
    };

  $scope.createUser = function () {
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

         usersFactory.createUser(data,$rootScope.config).then(function(data){
           data = data['data'];
           //Set rootScope and Cookie to token
           $cookies.put("userToken", data['token']);
           $cookies.put("userEmail", $scope.userCreateEmail);
           $rootScope.userToken = $cookies.get("userToken");
           window.location.href = "#/dashboard";
         });
       }else{
         console.log("invalid params");
       }
  };
});
