var ImagesView = Backbone.View.extend({
    el: $('#main'),

    template: _.template($('#images').html()),

    render: function () {
        $(this.el).html(this.template());
    }
});
