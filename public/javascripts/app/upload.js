var viewModel = function () {
    var self = this;

    self.image = ko.observable();

    var data = {
        image: self.image
    };

    self.post = function () {
        $.ajax({
            url: '/api/photos',
            type: "POST",
            data: data,
            dataType: 'json'
        }).success(function () {
                alert('asfasf');
            });
    };
};

$(document).ready(function () {
    ko.applyBindings(viewModel);
});