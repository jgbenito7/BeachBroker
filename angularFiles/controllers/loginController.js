app.controller('loginCtrl', function($scope, $location, $route, $rootScope, $http, $cookies, usersFactory, Facebook) {

  $scope.invalidLogin = false;
  $scope.invalidCreateParams = false;
  $scope.userAlreadyExists = false;

   $(document).ready(function(){
     $(".register").click(function(){
       $('#myModal').modal('show');
     });
     $('#myModal').on('hidden.bs.modal', function () {
       console.log("hidden");
          $(this).find("input,textarea,select").val('').end();
          $scope.$apply(function () {
            $scope.invalidCreateParams = false;
            $scope.userAlreadyExists = false;
          });
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
          $scope.invalidLogin = true;
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
         },function(error){
           if(error['status'] == 401){
             $scope.userAlreadyExists = true;
           }
         });
       }else{
         $scope.invalidCreateParams = true;
       }
  };

  $scope.facebookData = {};

  $scope.facebook = function(){
    Facebook.getLoginStatus(function(response) {
      if (response && response.status === 'connected') {
        console.log("User Is Logged In Through Facebook");
        console.log(response);

        $cookies.put("userToken", response['authResponse']['accessToken']);
        $rootScope.userToken = $cookies.get("userToken");

        var data = $.param({
            facebookId: response['authResponse']['userID'],
            facebookToken: response['authResponse']['accessToken']
        });

        usersFactory.updateFB(data,$rootScope.config).then(function(data){
          console.log("FB Token Updated");
          window.location.href = "#/dashboard";
        });
      }else{
        console.log("User Is Not Logged In");
        Facebook.login(function (response) {
            if (response.status == 'connected') {
                $scope.logged = true;
                $scope.facebookData['facebookId'] = response['authResponse']['userID'];
                $scope.facebookData['facebookToken'] = response['authResponse']['accessToken'];
                FB.api('/me', { locale: 'en_US', fields: 'name, email' },
                  function(response) {
                    $scope.facebookData['email'] = response['email'];
                    var firstName = response['name'].substr(0,response['name'].indexOf(' '));
                    var lastName = response['name'].substr(response['name'].indexOf(' '),response['name'].length);
                    $scope.facebookData['firstName'] = firstName;
                    $scope.facebookData['lastName'] = lastName;
                    console.log($scope.facebookData);
                    var data = $.param({
                        email: $scope.facebookData['email'],
                        facebookId: $scope.facebookData['facebookId'],
                        facebookToken: $scope.facebookData['facebookToken'],
                        firstName: $scope.facebookData['firstName'],
                        lastName: $scope.facebookData['lastName']
                    });
                    $cookies.put("userToken", $scope.facebookData['facebookToken']);
                    $cookies.put("userEmail", $scope.facebookData['email']);
                    $rootScope.userToken = $cookies.get("userToken");
                    usersFactory.facebook(data,$rootScope.config).then(function(data){
                      window.location.href = "#/dashboard";
                    });
                  }
                );
            }

        },{scope: 'email'});
      }
    });
  };
});
