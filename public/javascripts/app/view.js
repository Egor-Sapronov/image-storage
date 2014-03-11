var Views = {};

var Images = Backbone.View.extend({
    el: $('#main'),

    template: _.template($('#images').html()),

    render: function () {
        this.images.fetch();
        $(this.el).html(this.template({images: this.images.toJSON()}));
    },

    events: {
        'click input:submit': 'save',
        'change images': 'render'
    },

    image: new ImageModel(),

    images: new ImagesCollection(),


    save: function () {
        this.image.set({name: 'newImage'});
        this.image.save();
    }
});

var Upload = Backbone.View.extend({
    el: $('#main'),

    template: _.template($('#upload').html()),

    image: new ImageModel(),

    render: function () {
        $(this.el).html(this.template());
    }
});

var Bundles = Backbone.View.extend({
    el: $('#main'),

    template: _.template($('#bundles').html()),

    render: function () {
        $(this.el).html(this.template());
    }
});

var LogIn = Backbone.View.extend({
    el: $('#auth'),

    template: _.template($('#login').html()),

    user: new UserModel(),

    events: {
        'click button:submit': 'login'
    },

    login: function () {
        this.user.set({username: $('#name').val(), password: $('#password').val()});
        this.user.save().success(function (model, res) {
//            var token = new TokenModel();
            auth.refreshToken = model.refresh_token;
            auth.accessToken = model.access_token;
            $.ajaxSetup({
                headers: { 'Authorization': 'Bearer ' + auth.accessToken }
            });
        });
    },

    render: function () {
        $(this.el).html(this.template());
    }
});

Views = {
    images: new Images(),
    bundles: new Bundles(),
    login: new LogIn(),
    upload: new Upload()
};
