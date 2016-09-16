app.controller('propertySearchCtrl', function($scope, $rootScope, $routeParams, $http) {
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

  console.log($routeParams);




  $scope.searchProperties = function(){
    var data = $.param({
        streetNumber: $scope.address.streetNumber,
        streetName: $scope.address.streetName,
        city: $scope.address.city,
        state: $scope.address.state,
        country: $scope.address.country,

    });
    //console.log($scope.address.country);
    $http.post($rootScope.baseUrl + "/listings/all", data, config)
    .success(function (data, status, headers, config) {
      $scope.listings = data;

        console.log(data);
    })
    .error(function (data, status, header, config) {
        console.log("Error");
    });
    //console.log($scope.address);
  };

  var config = {
      headers : {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
  }



});
