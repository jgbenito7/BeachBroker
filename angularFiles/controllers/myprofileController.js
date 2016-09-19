app.controller('myprofileCtrl', function($scope, $rootScope, $location, $http, $route, usersFactory) {
  $scope.data = [];
  $scope.userData = [];

   var data = $.param({
       userToken: $rootScope.userToken //Might need to change this later.
   });

   usersFactory.getUserName(data,$rootScope.config).then(function(data){
     $scope.userData = data['data'][0];
     console.log(data);
   });
});
