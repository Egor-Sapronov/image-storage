var Views = {};

var Images = Backbone.View.extend({
    el: $('#main'),

    template: _.template($('#images').html()),

    initialize: function () {
        this.images = new ImagesCollection();
    },

    render: function () {
        var self = this;
        self.images.fetch();
        $(this.el).html(this.template({images: this.images.toJSON()}));
    },

    events: {
        'change images': 'render'
    }
});

var Upload = Backbone.View.extend({
    el: $('#main'),

    template: _.template($('#upload').html()),

    initialize: function () {
        this.image = new ImageModel();
        $('#uploadForm').ajaxForm({data: {'Authorization': 'Bearer ' + auth.accessToken}});
    },

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
            auth.setAccessToken(model.access_token);
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
