var UserModel = Backbone.Model.extend({
    url: 'oauth/user'
});

var LogInModel = Backbone.Model.extend({
    defaults: {
        'grant_type': 'password',
        'client_id': 'webV1',
        'client_secret': 'abc123456'
    },
    url: '/oauth/token'
});