var ImageModel = Backbone.Model.extend({
    urlRoot: '/api/images'
});

var ImagesCollection = Backbone.Collection.extend({
    model: ImageModel,
    url: '/api/images'
});

var Bundle = Backbone.Model.extend({
    urlRoot: 'api/bundles'
});

var Bundles = Backbone.Collection.extend({
    model: Bundle,
    url: 'api/bundles'
});

var UserModel = Backbone.Model.extend({
    defaults: {
        'grant_type': 'password',
        'client_id': 'website',
        'client_secret': 'secret'
    },
    url: 'oauth/token'
});

var TokenModel = Backbone.Model.extend({
    defaults: {
        'grant_type': 'refresh_token',
        'client_id': 'website',
        'client_secret': 'secret'
    },
    url: 'oauth/token'
})




