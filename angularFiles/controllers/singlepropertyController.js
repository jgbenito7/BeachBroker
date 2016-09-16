app.controller('singlePropertyCtrl', function($scope, $rootScope, $routeParams, $http) {

  var propId = $routeParams.propId;

  var data = $.param({
      userToken: $rootScope.userToken //Might need to change this later.
  });

  var config = {
      headers : {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
      }
  }


  $http.get($rootScope.baseUrl + "/listings/" + propId,config)
  .success(function (data, status, headers, config) {
    $scope.data = data;
    $scope.listingData = data['listingData'][0];
    $scope.listingPictures = data['listingPictures'];

      console.log(data);

      $.getScript('assets/js/villareal.js', function(){});
  })
  .error(function (data, status, header, config) {
      console.log("Error");
  });

  $http.post($rootScope.baseUrl + "/users/name", data, config)
  .success(function (data, status, headers, config) {
    $scope.userData = data[0];

      console.log($scope.userData);
  })
  .error(function (data, status, header, config) {
      console.log("Error");
  });

});

app.filter('stateName', function() {

  // In the return function, we must pass in a single parameter which will be the data we will work on.
  // We have the ability to support multiple other parameters that can be passed into the filter optionally
  return function(input, optional1, optional2) {


    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arizona', 'AZ'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    //input = input.toUpperCase();
    for(i = 0; i < states.length; i++){
        if(states[i][1] == input){
            return(states[i][0]);
        }
    }


    //return output;

  }

});
