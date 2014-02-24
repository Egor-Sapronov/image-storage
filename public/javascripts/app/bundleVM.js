var viewModel = function () {
    var self = this;

    self.images = ko.observableArray();

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

    self.get();
};

$(document).ready(function(){
    ko.applyBindings(new viewModel());
});