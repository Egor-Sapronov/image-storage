var Controller = Backbone.Router.extend({
    routes: {
        '': 'upload',
        '!/': 'upload',
        '!/images': 'images',
        '!/bundles': 'bundles',
        '!/login':'login'
    },

    upload: function () {
        $('.block').hide();
        $('#upload').show();
    },

    images: function () {
        $('.block').hide();
        $('#images').show();
    },

    bundles: function () {
        $('.block').hide();
        $('bundles').show();
    },

    login: function () {
        $('.block').hide();
        $('login').show();
    }
});

var controller = new Controller();

Backbone.history.start();
