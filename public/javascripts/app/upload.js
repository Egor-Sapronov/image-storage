$(document).ready(function () {

    $('#uploadForm').ajaxForm({data: {'Authorization': 'Bearer ' + auth.accessToken}});
});
