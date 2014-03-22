var Controller = Backbone.Router.extend({
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
