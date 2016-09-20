app.controller('propertySearchCtrl', function($scope, $rootScope, $routeParams, $http, listingsFactory) {
  $.getScript('assets/js/villareal.js', function(){});

  $scope.searchString = "";

  //Get the search string if there is one
  var searchList = $routeParams['parameters'].split('?');
  console.log(searchList);

  $scope.address= {
    streetNumber: searchList[0],
    streetName: searchList[1],
    city: searchList[2],
    state: searchList[3],
    country: searchList[4]
  };

  var data = $.param({
      streetNumber: $scope.address.streetNumber,
      streetName: $scope.address.streetName,
      city: $scope.address.city,
      state: $scope.address.state,
      country: $scope.address.country,
  });

  for(x in searchList){
    if(searchList[x] != "undefined"){
      $scope.searchString += searchList[x] + " ";
    }
  }

  listingsFactory.searchListings(data,$rootScope.config).then(function(data){
    $scope.listings = data['data'];
  });

  $scope.interval = 2;
  $scope.currentPage = 0;
  $scope.start = $scope.currentPage*$scope.interval;
  $scope.end = $scope.start + $scope.interval;

  $scope.searchProperties = function(){
    var data = $.param({
        streetNumber: $scope.address.streetNumber,
        streetName: $scope.address.streetName,
        city: $scope.address.city,
        state: $scope.address.state,
        country: $scope.address.country,

    });

  //  console.log(data);
  console.log($scope.address);

    $scope.searchString = "";

    for(x in $scope.address){
      if($scope.address[x] != undefined && x!="fullAddress"){
        $scope.searchString += $scope.address[x] + " ";
      }
    }

    console.log($scope.searchString);



    listingsFactory.searchListings(data,$rootScope.config).then(function(data){
      $scope.listings = data['data'];
    });
  };



});
