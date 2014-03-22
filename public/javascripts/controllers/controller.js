var Controller = Backbone.Router.extend({
    initialize: function () {
        if (Views.navBar != null)
            View.navBar.render();
    }
});
