app.controller('editprofileCtrl', function($scope, $rootScope, $location, $http, $route) {
  //

  $scope.submitProfile = function(){
    // enable auto process queue after uploading started

    $scope.processDropzone(function(){

    });
  };

  $scope.data = [];
  $scope.userData = [];
  //console.log("Authenticating user");
  // use $.param jQuery function to serialize data from JSON
   var data = $.param({
       userToken: $rootScope.userToken //Might need to change this later.
   });

   var config = {
       headers : {
           'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
       }
   }


   $http.post($rootScope.baseUrl + "/users/name", data, config)
   .success(function (data, status, headers, config) {
     $scope.userData = data[0];
     console.log(data)
   })
   .error(function (data, status, header, config) {
       console.log("Error");
   });
});
