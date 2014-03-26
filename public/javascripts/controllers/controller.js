var Controller = Backbone.Router.extend({
    routes: {
        '': 'images',
        '!/': 'images',
        '!/images': 'images'
    },

    images: function () {
        if (Views.images != null) {
            Views.images.render();
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
