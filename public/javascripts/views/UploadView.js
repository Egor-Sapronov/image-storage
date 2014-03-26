var UploadView = Backbone.View.extend({
    el: $('#main'),

    template: _.template($('#upload').html()),

    render: function () {
        $(this.el).html(this.template());
    }
});
