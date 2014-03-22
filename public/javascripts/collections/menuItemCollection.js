var MenuItemCollection = Backbone.Collection.extend({
    model: MenuItem,

    initialize: function () {
        this.on('change:isSelected', this.onSelectedChanged, this);
    },

    onSelectedChanged: function (model) {
        this.each(function (model) {
            if (model.get('isSelected') === true && !model.hasChanged('isSelected')) {
                model.set({isSelected: false});
            }
        });
    }
});
