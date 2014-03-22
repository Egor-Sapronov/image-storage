var AuthView = Backbone.View.extend({
    el: $('#auth'),

    logIn: new LogInModel(),

    user: new UserModel(),

    templates: {
        'logIn': _.template($('#logIn').html()),
        'loggedIn': _.template($('#loggedIn').html())
    },

    render: function () {
        $(this.el).html(this.templates['logIn']());
    }
});
