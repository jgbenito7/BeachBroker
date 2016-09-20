app.controller('dashboardCtrl', function($scope, $rootScope, $location, $http, $route, listingsFactory, usersFactory) {

   $scope.data = [];
   $scope.userData = [];

   var data = $.param({
       userToken: $rootScope.userToken //Might need to change this later.
   });

   listingsFactory.getUserListings(data,$rootScope.config).then(function(data){
     $scope.data = data['data'];
     //console.log(data);
   });

   usersFactory.getUserName(data,$rootScope.config).then(function(data){
     $scope.userData = data['data'][0];
     //console.log(data);
   });
});
