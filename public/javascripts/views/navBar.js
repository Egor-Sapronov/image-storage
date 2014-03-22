var NavBar = Backbone.View.extend({
    el: $('#menu'),

    template: _.template($('#nav').html()),

    events: {
        'click li': 'setActive'
    },

    setActive: function (event) {
        this.$('li').removeClass('active');
        this.$(event.currentTarget).addClass('active');
    },

    render: function () {
        $(this.el).html(this.template());
    }
});