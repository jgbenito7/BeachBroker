app.controller('editprofileCtrl', function($scope, $rootScope, $location, $http, $route, usersFactory) {
  $scope.submitProfile = function(){
    $scope.processDropzone(function(){});
  };

  $scope.data = [];
  $scope.userData = [];
  $scope.firstName = "";
  $scope.lastName = "";
  $scope.contactEmail = "";
  $scope.phone = "";
  //console.log("Authenticating user");
  // use $.param jQuery function to serialize data from JSON
   var data = $.param({
       userToken: $rootScope.userToken //Might need to change this later.
   });

   usersFactory.getUserName(data,$rootScope.config).then(function(data){
     $scope.userData = data['data'][0];
     $scope.firstName = $scope.userData['firstName'];
     $scope.lastName = $scope.userData['lastName'];
     $scope.contactEmail = $scope.userData['contactEmail'];
     $scope.phone = $scope.userData['phone'];
   });
});
