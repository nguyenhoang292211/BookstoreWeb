$(document).ready(function ()
{
    $('#fileInput').on('change', function () {
        var files = $(this)[0].files;
        uploadFile(files, 0);
    });

    function uploadFile(files, index) {
        var length = files.length
        if (index == length) {
            return;
        }

        var file = files[index];
        var fileReader = new FileReader();
        fileReader.onload = function () {
            var str = '<div>' + '<img class="img-addproduct js-file-image style="">' + '<div>';
            $('.js-file-list').append(str);

            var imageSrc = event.target.result;
            var fileName = file.name;

            $('.js-file-name').last().text(fileName);
            $('.js-file-image').last().attr('src', imageSrc);

            uploadFile(files, index + 1);
        };
        fileReader.readAsDataURL(file);
    }
});