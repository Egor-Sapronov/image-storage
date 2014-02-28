var viewModel = function () {
    var self = this;

    self.images = ko.observableArray();
    self.selectedImages = ko.observableArray();


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

    self.addImageUrl = function () {
        var src = $("img",this).attr('src');
        self.selectedImages.push(src);
    };

    self.get();
};

$(document).ready(function () {
    ko.applyBindings(new viewModel());
});