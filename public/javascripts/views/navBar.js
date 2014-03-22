var NavBar = Backbone.View.extend({
    el: $('#menu'),

    template: _.template($('#nav').html()),

    render: function () {
        $(this.el).html(this.template());
    }
});