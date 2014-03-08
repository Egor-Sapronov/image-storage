var Controller = Backbone.Router.extend({
    routes: {
        '': 'images',
        '!/': 'images',
        '!/bundles':'bundles'
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
    }
});

var controller = new Controller();

Backbone.history.start();
