var Controller = Backbone.Router.extend({
    routes: {
        '': 'upload',
        '!/': 'upload',
        '!/images': 'images'
    },

    upload: function () {
        if (Views.upload != null) {
            Views.upload.render();
        }
    },

    images: function () {
        if (Views.images != null) {
            Views.images.render();
        }
    }
});

var controller = new Controller();

Backbone.history.start();
