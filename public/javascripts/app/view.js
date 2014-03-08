var Views = {};

var Images = Backbone.View.extend({
    el: $('#main'),

    template: _.template($('#images').html()),

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

Views = {
    images: new Images(),
    bundles: new Bundles
};
