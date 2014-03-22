var MenuItemView = Backbone.View.extend({
    tagName: 'li',
    events: {
        'click': 'highlight'
    },

    initialize: function () {
        _.bindAll(this);
        this.model.on('change:isSelected', this.onSelectedChanged);
    },

    render: function () {
        this.$el.text(this.model.get('title'));
        return this;
    },

    onSelectedChanged: function () {
        if (this.model.get('isSelected') === true) {
            this.$el.addClass('active');
        }
        else {
            this.$el.removeClass('active');
        }
    },

    highlight: function () {
        this.model.set({isSelected: true});
    }
});