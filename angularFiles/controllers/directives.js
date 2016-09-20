app.directive('profile', function($cookies,$location,$route) {
  return {
      restrict: 'A',
      link: function(scope, element, attrs) {

        Dropzone.autoDiscover = false;

          var config = {
              url: 'http://localhost:8080/users/update',
              method: "post",
              maxFilesize: 15,
              paramName: "file",
              headers:{
                // remove Cache-Control and X-Requested-With
                // to be sent along with the request
                'Cache-Control': null,
                'X-Requested-With': null
              },
              maxFiles: 1,
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
                  console.log("called");
              },
              'maxfilesexceeded': function(file){
                console.log("exceeded");
                scope.file = file;
                //console.log(this.files);
                this.removeFile(this.files[this.files.length - 1]); //remove the file
                /*if (this.files[1]!=null) {

                }*/
              },
              'sending': function(file, xhr, formData){
                formData.append("userToken", $cookies.get("userToken"));
                formData.append("firstName",scope.firstName);
                formData.append("lastName",scope.lastName);
                formData.append("contactEmail",scope.contactEmail);
                formData.append("phone",scope.phone);

                console.log(formData);
              },
              'sendingmultiple': function(file, xhr, formData){


              },

              'completemultiple': function (file, response) {

              }

          };

          dropzone = new Dropzone(element[0], config);

          angular.forEach(eventHandlers, function(handler, event) {
              dropzone.on(event, handler);
          });

          scope.processDropzone = function(callback) {
              dropzone.options.autoProcessQueue = true;
              dropzone.processQueue();
              callback();
          };

          scope.resetDropzone = function() {
              dropzone.removeAllFiles();
          }

          dropzone.on("queuecomplete", function() {
            dropzone.options.autoProcessQueue = false;
            var delay = 2000; //2 second

            setTimeout(function() {
              $location.path('my-profile');
              $route.reload();
            }, delay);

          });
      }
  }
});

app.directive('dropzone', function($cookies,$location,$route) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

            console.log("dropzone directive found");

            Dropzone.autoDiscover = false;
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
                maxFiles: 28,
                dictDefaultMessage: "Upload Images Here",
                acceptedFiles: ".png,.jpeg,.jpg",
                autoProcessQueue: false,
                parallelUploads: 28,
                addRemoveLinks: true
            };

            var eventHandlers = {
                'addedfile': function(file) {

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
                'init':function(){
                  console.log("Dropzone Initialized");
                },
                'sendingmultiple': function(file, xhr, formData){

                  console.log("sending");

                  //console.log(formData);
                  formData.append("userToken", $cookies.get("userToken"));
                  formData.append("description",scope.description);
                  formData.append("fullAddress",scope.address.fullAddress);
                  formData.append("streetNumber",scope.address.streetNumber);
                  formData.append("streetName",scope.address.streetName);
                  formData.append("city",scope.address.city);
                  formData.append("state", scope.address.state);
                  formData.append("country", scope.address.country);
                  formData.append("zipcode",scope.address.zipcode);
                  formData.append("latitude",scope.address.lat);
                  formData.append("longitude",scope.address.long);
                  formData.append("cost",scope.cost);
                  formData.append("sqft",scope.sqft);
                  formData.append("beds",scope.beds);
                  formData.append("baths",scope.baths);
                  formData.append("beachDistance",scope.beachDistance);
                  formData.append("homeType",scope.homeType);
                  formData.append("published","no");
                },

                'completemultiple': function (file, response) {

                }

            };

            dropzone = new Dropzone(element[0], config);

            angular.forEach(eventHandlers, function(handler, event) {
                dropzone.on(event, handler);
            });

            scope.processDropzone = function(callback) {
                dropzone.options.autoProcessQueue = true;
                dropzone.processQueue();
                callback();
            };

            scope.resetDropzone = function() {
                dropzone.removeAllFiles();
            }

            dropzone.on("queuecomplete", function() {
              dropzone.options.autoProcessQueue = false;
              var delay = 2000; //2 second

              setTimeout(function() {
                $location.path('dashboard');
                $route.reload();
              }, delay);

            });
        }
    }
});
