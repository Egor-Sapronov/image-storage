var Controller = Backbone.Router.extend({
    routes: {
        '': 'images',
        '!/': 'images',
        '!/images': 'images',
        '!/bundles': 'bundles',
        '!/upload': 'upload'
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

    initialize: function () {
        if (Views.navBar != null) {
            Views.navBar.render();
        }
        if (Views.auth != null) {
            Views.auth.render();
        }
    }
});

var controller = new Controller();

Backbone.history.start();
