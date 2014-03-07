var Image = Backbone.Model.extend({
    urlRoot: '/api/images'
});

var Images = Backbone.Collection.extend({
    model: Image,
    url: '/api/images'
});

var Bundle = Backbone.Model.extend({
    urlRoot: 'api/bundles'
});

var Bundles = Backbone.Collection.extend({
    model: Bundle,
    url: 'api.bundles'
});




