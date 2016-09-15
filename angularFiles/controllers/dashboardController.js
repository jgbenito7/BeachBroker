app.controller('dashboardCtrl', function($scope, $rootScope, $location, $http, $route) {
  //

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

           $http.post($rootScope.baseUrl + "/listings/user", data, config)
           .success(function (data, status, headers, config) {
             $scope.data = data;

               console.log(data);
           })
           .error(function (data, status, header, config) {
               console.log("Error");
           });

           $http.post($rootScope.baseUrl + "/users/name", data, config)
           .success(function (data, status, headers, config) {
             $scope.userData = data[0];
             console.log(data)
           })
           .error(function (data, status, header, config) {
               console.log("Error");
           });
});
