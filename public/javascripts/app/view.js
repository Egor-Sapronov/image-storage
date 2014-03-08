var Views = {};

var Images = Backbone.View.extend({
    el: $('#main'),

    template: _.template($('#images').html()),

    render: function () {
        this.images.fetch();
        $(this.el).html(this.template({images:this.images.toJSON()}));

    },

    events:{
        'click input:submit':'save',
        'change images':'render'
    },

    image:new ImageModel(),

    images:new ImagesCollection(),

    save:function(){
        this.image.set({name:'newImage'});
        this.image.save();
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
    bundles: new Bundles()
};
