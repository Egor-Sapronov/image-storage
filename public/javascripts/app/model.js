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
        'client_id': 'webV1',
        'client_secret': 'abc123456'
    },
    url: 'oauth/token'
});

var UserLogedModel = Backbone.Model.extend({
    url: 'oauth/user'
});

var TokenModel = Backbone.Model.extend({
    defaults: {
        'grant_type': 'refresh_token',
        'client_id': 'webV1',
        'client_secret': 'abc123456'
    },

    url: 'oauth/token'
});




