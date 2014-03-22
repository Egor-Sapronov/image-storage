var AuthView = Backbone.View.extend({
    el: $('#auth'),

    template: _.template($('#logIn').html()),

    render: function () {
        $(this.el).html(this.template());
    }
});
