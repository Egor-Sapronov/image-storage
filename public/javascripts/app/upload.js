$(document).ready(function () {
    // Check to see when a user has selected a file
    var timerId;
    timerId = setInterval(function () {
        if ($('#userPhotoInput').val() !== '') {
            clearInterval(timerId);

            $('#uploadForm').submit();
        }
    }, 500);

//    $('#uploadForm').submit(function () {
//        $(this).ajaxSubmit({
//            header: { 'Authorization': 'Bearer ' + auth.accessToken },
//            error: function (xhr) {
//
//            },
//
//            success: function (response) {
//                //TODO: We will fill this in later
//            }
//        });
//
//        // Have to stop the form from submitting and causing
//        // a page refresh - don't forget this
//        return false;
//    });

    $('#uploadForm').ajaxForm();
});
