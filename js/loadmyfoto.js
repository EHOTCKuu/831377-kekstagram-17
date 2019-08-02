'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadPreviewLoad = document.querySelector('.img-upload__preview img');
  window.imgUploadPreviewLoad = imgUploadPreviewLoad;
  imgUploadPreviewLoad.style.height = '600px';
  imgUploadPreviewLoad.style.width = '600px';

  uploadFile.addEventListener('change', function () {
    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imgUploadPreviewLoad.src = reader.result;
      });
    }

    reader.readAsDataURL(file);
  });
})();
