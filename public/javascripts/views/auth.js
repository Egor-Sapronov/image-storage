var AuthView = Backbone.View.extend({
    el: $('#auth'),

    userLogIn: new LogInModel(),

    user: new UserModel(),

    templates: {
        'logIn': _.template($('#logIn').html()),
        'loggedIn': _.template($('#loggedIn').html())
    },

    events: {
        'click #logInButton': 'logIn'
    },

    logIn: function () {
        this.userLogIn.set({username: $('#name').val(), password: $('#password').val()});
        var self = this;
        this.userLogIn.save()
            .success(function (model, res) {
                auth.setAccessToken(model.access_token);
                $(self.el).html(self.templates['loggedIn']());
            });
    },

    render: function () {
        var self = this;
        this.user.fetch()
            .error(function (err) {
                $(self.el).html(self.templates['logIn']());
            })
            .success(function (model, res) {
                $(self.el).html(self.templates['loggedIn']({user:self.user.toJSON()}));
            });
    }
});
