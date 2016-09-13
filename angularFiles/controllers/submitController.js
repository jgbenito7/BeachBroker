app.controller('submitCtrl', function($scope, $rootScope) {
  $scope.submitProperty = function(){
    $scope.processDropzone();
  };

  //$scope.title = "";



});

app.directive('dropzone', function($cookies) {
                return {
                    restrict: 'C',
                    link: function(scope, element, attrs) {

                        var config = {
                            url: 'http://localhost:8080/listings/pictures',
                            method: "post",
                            maxFilesize: 15,
                            paramName: "file",
                            uploadMultiple: true,
                            headers:{
                              // remove Cache-Control and X-Requested-With
                              // to be sent along with the request
                              'Cache-Control': null,
                              'X-Requested-With': null
                            },
                            maxFiles: 12,
                            dictDefaultMessage: "Upload Images Here",
                            acceptedFiles: ".png,.jpeg,.jpg",
                            autoProcessQueue: false,
                            addRemoveLinks: true
                        };

                        var eventHandlers = {
                            'addedfile': function(file) {
                                //scope.file = file;
                                //console.log(file)
                                // if (this.files[1]!=null) {
                                //     this.removeFile(this.files[0]);
                                // }

                            },
                            'maxfilesexceeded': function(file){
                              scope.file = file;
                              if (this.files[1]!=null) {
                                  this.removeFile(this.files[0]);
                              }
                            },
                            'sending': function(file, xhr, formData){
                              //console.log(formData);
                              formData.append("userToken", $cookies.get("userToken"));
                              formData.append("title",scope.title);
                              formData.append("description",scope.description);
                              formData.append("address",scope.address);
                              formData.append("city",scope.city);
                              formData.append("state", scope.state);
                              formData.append("zipcode",scope.zipcode);
                              formData.append("cost",scope.cost);
                              formData.append("beachDistance",scope.beachDistance);
                              formData.append("published","no");
                            },

                            'success': function (file, response) {
                            }

                        };

                        dropzone = new Dropzone(element[0], config);

                        angular.forEach(eventHandlers, function(handler, event) {
                            dropzone.on(event, handler);
                        });

                        scope.processDropzone = function() {
                            dropzone.processQueue();
                        };

                        scope.resetDropzone = function() {
                            dropzone.removeAllFiles();
                        }
                    }
                }
            });
