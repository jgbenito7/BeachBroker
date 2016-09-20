app.controller('submitCtrl', function($scope, $rootScope, $location) {
  //Add some kind of form validation here.
  $scope.validForm = false;
  $scope.termsNotAgreed = false;

  $scope.address = false;
  $scope.cost = false;
  $scope.beds = 0;
  $scope.baths = 0;
  $scope.sqft = 0;
  $scope.type = false;
  $scope.beachDistance = 0;
  $scope.terms = false;

  $scope.submitProperty = function(){

    if($scope.address &&
       $scope.cost &&
       $scope.beds &&
       $scope.baths &&
       $scope.sqft &&
       $scope.description &&
       $scope.type &&
       $scope.beachDistance){
         if($scope.terms == false){
           $scope.termsNotAgreed = true;
         }else{
           $scope.processDropzone(function(){});
         }

    }else{
      $scope.validForm = true;
    }
  };

  document.getElementById("myRange").max = "5000";
  $scope.cost = 0;



});
