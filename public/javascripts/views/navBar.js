var NavBar = Backbone.View.extend({
    el: $('#menu'),

    template: _.template($('#nav').html()),

    events: {
        'click li': 'setActive'
    },

    setActive: function () {
        this.$('.li').removeClass('active');
    },

    render: function () {
        $(this.el).html(this.template());
    }
});