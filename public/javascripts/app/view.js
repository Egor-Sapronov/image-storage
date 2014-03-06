var Views = {};

var Upload = Backbone.View.extend({
    el: $('#block'),

    template: _.template($('#upload').html()),

    render: function () {
        $(this.el).html(this.template());
    }
});

var Images = Backbone.View.extend({
    el: $('#block'),

    template: _.template($('#images').html()),

    render: function () {
        $(this.el).html(this.template());
    }
});

Views = {
    upload: new Upload(),
    images: new Images()
};

