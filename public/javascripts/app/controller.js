var Controller = Backbone.Router.extend({
    routes: {
        '': 'upload',
        '!/':'upload',
        '!/images': 'images',
        '!/bundles':'bundles'
    },
    images: function () {
        if (Views.images != null) {
            Views.images.render();
            Views.login.render();
        }
    },
    bundles: function () {
        if (Views.bundles != null) {
            Views.bundles.render();
            Views.login.render();
        }
    },
    upload:function(){
        if(Views.upload!=null){
            Views.upload.render();
            Views.login.render();
        }
    }
});

var controller = new Controller();

Backbone.history.start();
