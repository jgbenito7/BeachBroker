app.controller('submitCtrl', function($scope, $rootScope) {
  //$.getScript('assets/js/dropzone.js', function(){
    $("#my-awesome-dropzone").dropzone({ url: "/file/post" });
    //console.log("fileLoaded");
    /*$("div#upload-widget").dropzone({ url: "/file/post" });
    Dropzone.options.uploadWidget = {
    paramName: 'file',
    maxFilesize: 2, // MB
    maxFiles: 1,
    dictDefaultMessage: 'Drag an image here to upload, or click to select one',
    headers: {
      'x-csrf-token': document.querySelectorAll('meta[name=csrf-token]')[0].getAttributeNode('content').value,
    },
    acceptedFiles: 'image/*',
    init: function() {
      this.on('success', function( file, resp ){
        console.log( file );
        console.log( resp );
      });
      this.on('thumbnail', function(file) {
        if ( file.width < 640 || file.height < 480 ) {
          file.rejectDimensions();
        }
        else {
          file.acceptDimensions();
        }
      });
    },
    accept: function(file, done) {
      file.acceptDimensions = done;
      file.rejectDimensions = function() {
        done('The image must be at least 640 x 480px')
      };
    }
  };*/
  // Dropzone.options.myAwesomeDropzone = {
  //   paramName: "file", // The name that will be used to transfer the file
  //   maxFilesize: 2, // MB
  //   accept: function(file, done) {
  //     if (file.name == "justinbieber.jpg") {
  //       done("Naha, you don't.");
  //     }
  //     else { done(); }
  //   },
  //   previewTemplate: "<div class='dz-preview dz-file-preview'>" +
  //                       "<div class='dz-image'>" +
  //                         "<img data-dz-thumbnail />"+
  //                       "</div>"+
  //                       "<div class='dz-details'>"+
  //                         "<div class='dz-size'>"+
  //                           "<span data-dz-size></span>"+
  //                         "</div>"+
  //                         "<div class='dz-filename'>"+
  //                           "<span data-dz-name></span>"+
  //                         "</div>"+
  //                       "</div>"+
  //                       "<div class='dz-progress'>"+
  //                       "  <span class='dz-upload' data-dz-uploadprogress></span>"+
  //                       "</div>"+
  //                       "<div class='dz-error-message'>"+
  //                       "  <span data-dz-errormessage></span>"+
  //                       "</div>"+
  //                       "<div class='dz-success-mark'>"+
  //                     "    <svg>REMOVED FOR BREVITY</svg>"+
  //                     "  </div>"+
  //                     "  <div class='dz-error-mark'>"+
  //                     "    <svg>REMOVED FOR BREVITY</svg>"+
  //                     "  </div>"+
  //                     "</div>"
  // };

//});



});
