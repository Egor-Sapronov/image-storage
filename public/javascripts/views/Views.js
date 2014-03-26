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

var BundlesView = Backbone.View.extend({
    el: $('#main'),

    template: _.template($('#bundles').html()),

    render: function () {
        $(this.el).html(this.template());
    }
});

var CreateBundleView = Backbone.View.extend({
    el: $('#main'),

    template: _.template($('#createBundle').html()),

    render: function () {
        $(this.el).html(this.template());
    }
});

var ImagesView = Backbone.View.extend({
    el: $('#main'),

    template: _.template($('#images').html()),

    render: function () {
        $(this.el).html(this.template());
    }
});

var NavBarView = Backbone.View.extend({
    el: $('#menu'),

    template: _.template($('#nav').html()),

    events: {
        'click li': 'setActive'
    },

    setActive: function (event) {
        this.$('li').removeClass('active');
        this.$(event.currentTarget).addClass('active');
    },

    render: function () {
        $(this.el).html(this.template());
    }
});

var UploadView = Backbone.View.extend({
    el: $('#main'),

    template: _.template($('#upload').html()),

    events: {
        'click #uploadButton': 'upload'
    },

    upload: function () {
        var selectedFile = $('#file').get(0).files[0];
        var formData = new FormData();

        formData.append('file',selectedFile);

        var xhr = new XMLHttpRequest();

        xhr.open('POST', '/api/images', true);
        xhr.setRequestHeader('Authorization', 'Bearer ' + auth.getAccessToken());
        xhr.send(formData);

    },

    render: function () {
        $(this.el).html(this.template());
    }
});

var Views = {
    navBar: new NavBarView(),
    auth: new AuthView(),
    images: new ImagesView(),
    bundles: new BundlesView(),
    upload: new UploadView(),
    createBundle: new CreateBundleView()
};
