var Controller = Backbone.Router.extend({
    routes: {
        '': 'upload',
        '!/': 'upload',
        '!/images': 'images',
        '!/bundles': 'bundles'
    },
    images: function () {
        if (Views.images != null) {
            Views.images.render();
        }
    },
    bundles: function () {
        if (Views.bundles != null) {
            Views.bundles.render();
        }
    },
    upload: function () {
        if (Views.upload != null) {
            Views.upload.render();
        }
    },
    initialize: function (options) {
        LogIn();
    }
});

function LogIn() {
    var user = new UserLoggedModel();
    $.ajaxSetup({
        headers: { 'Authorization': 'Bearer ' + auth.getAccessToken() }
    });
    user.fetch()
        .error(function (err, res) {
            Views.login.render();
        })
        .success(function (model, res) {
            Views.logon.render();
        });
};

var controller = new Controller();

Backbone.history.start();
