var CreateBundleView = Backbone.View.extend({
    el: $('#main'),

    template: _.template($('#createBundle').html()),

    render: function () {
        $(this.el).html(this.template());
    }
});
