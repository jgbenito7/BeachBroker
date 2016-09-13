app.controller('submitCtrl', function($scope, $rootScope) {
  $scope.submitProperty = function(){
    // enable auto process queue after uploading started

    $scope.processDropzone();
  };
  $scope.cost = "";
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
                            parallelUploads: 12,
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
                              //console.log(this.files);
                              this.removeFile(this.files[this.files.length - 1]); //remove the file
                              /*if (this.files[1]!=null) {

                              }*/
                            },
                            'sending': function(file, xhr, formData){

                            },
                            'sendingmultiple': function(file, xhr, formData){

                              console.log("sending");

                              //console.log(formData);
                              formData.append("userToken", $cookies.get("userToken"));
                              formData.append("title",scope.title);
                              formData.append("description",scope.description);
                              formData.append("address",scope.address);
                              formData.append("city",scope.city);
                              formData.append("state", scope.state);
                              formData.append("zipcode",scope.zipcode);
                              formData.append("cost",scope.cost);
                              formData.append("sqft",scope.sqft);
                              formData.append("beds",scope.beds);
                              formData.append("baths",scope.baths);
                              formData.append("beachDistance",scope.beachDistance);
                              formData.append("published","no");
                            },

                            'successmultiple': function (file, response) {
                              //
                            }

                        };

                        dropzone = new Dropzone(element[0], config);

                        angular.forEach(eventHandlers, function(handler, event) {
                            dropzone.on(event, handler);
                        });

                        scope.processDropzone = function() {
                            dropzone.options.autoProcessQueue = true;
                            dropzone.processQueue();
                        };

                        scope.resetDropzone = function() {
                            dropzone.removeAllFiles();
                        }

                        dropzone.on("queuecomplete", function() {
                          dropzone.options.autoProcessQueue = false;
                        });
                    }
                }
            });
