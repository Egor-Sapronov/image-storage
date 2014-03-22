var AuthView = Backbone.View.extend({
    el: $('#auth'),

    templates: {
        'logIn': _.template($('#logIn').html()),
        'loggedIn': _.template($('#loggedIn').html())
    },

    events: {
        'click #logInButton': 'logIn',
        'click #logOffButton': 'logOff'
    },

    initialize: function () {
        this.userLogIn = new LogInModel();
        this.user = new UserModel();
    },

    logIn: function () {
        this.userLogIn.set({username: $('#name').val(), password: $('#password').val()});
        var self = this;
        this.userLogIn.save()
            .success(function (model, res) {
                auth.setAccessToken(model.access_token);
                self.user.set({name: self.userLogIn.get('username')});
                $(self.el).html(self.templates['loggedIn']({user: self.user.toJSON()}));
            });
    },

    logOff: function () {
        var self = this;
        $.ajax({
            type: 'POST',
            url: '/oauth/logoff',
            data: this.user.toJSON(),
            success: function () {
                $(self.el).html(self.templates['logIn']());
            }
        });
    },

    render: function () {
        var self = this;
        this.user.fetch()
            .error(function (err) {
                $(self.el).html(self.templates['logIn']());
            })
            .success(function (model, res) {
                $(self.el).html(self.templates['loggedIn']({user: self.user.toJSON()}));
            });
    }
});
