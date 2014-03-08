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
    url: 'api.bundles'
});




