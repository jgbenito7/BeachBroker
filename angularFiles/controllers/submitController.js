app.controller('submitCtrl', function($scope, $rootScope, $location) {
  $scope.submitProperty = function(){
    // enable auto process queue after uploading started

    $scope.processDropzone(function(){

    });
  };

  document.getElementById("myRange").max = "5000";
  $scope.cost = 0;

  $scope.test = function(){
    console.log($scope.address);
  }



});
