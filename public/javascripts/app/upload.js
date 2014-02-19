var viewModel = function () {
    var self = this;

    self.name = ko.observable('');
    self.image = ko.observable();

    var data = {
        name: self.name,
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