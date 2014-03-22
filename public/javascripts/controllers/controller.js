var Controller = Backbone.Router.extend({
    initialize: function () {
        if (Views.navBar != null)
            Views.navBar.render();
    }
});

var controller =new Controller();

Backbone.history.start();
