app.controller('propertySearchCtrl', function($scope, $rootScope, $routeParams, $http, listingsFactory) {
  $.getScript('assets/js/villareal.js', function(){});

  $scope.interval = 2;
  $scope.currentPage = 0;
  $scope.start = $scope.currentPage*$scope.interval;
  $scope.end = $scope.start + $scope.interval;


  $scope.address= {
    streetNumber: '',
    streetName: '',
    city: '',
    state: '',
    country: ''
  };

  $scope.searchProperties = function(){
    var data = $.param({
        streetNumber: $scope.address.streetNumber,
        streetName: $scope.address.streetName,
        city: $scope.address.city,
        state: $scope.address.state,
        country: $scope.address.country,

    });

    listingsFactory.searchListings(data,$rootScope.config).then(function(data){
      $scope.listings = data['data'];
    });
  };



});
