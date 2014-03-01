var viewModel = function () {
    var self = this;

    self.images = ko.observableArray();
    self.bundleName = ko.observable();
    self.selectedImages = ko.observableArray();
    self.imagesIds = [];


    self.get = function () {
        $.ajax({
            url: '/api/images',
            success: function (images) {
                $.each(images, function (index, value) {
                    self.images.push(value);
                });
            }
        });
    };

    self.addImageUrl = function (path) {
        self.selectedImages.push(path);
        self.imagesIds.push(path.split('.').shift());
    };


    self.postBundle = function () {
        var data = {
            name: self.bundleName,
            imagesId: self.imagesIds
        };

        $.ajax({
            type:'post',
            url: '/api/bundles',
            data: data,
            dataType: 'json'
        });
    };

    self.get();
};

$(document).ready(function () {
    ko.applyBindings(new viewModel());
});