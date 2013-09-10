TrelloClone.Views.BoardForm = Backbone.View.extend({

	template: JST['forms/editBoard'],
	
	events: {
		"submit #editBoard-form": "update"
	},
	
	render: function() {
		var that = this;
		
		var renderedContent = that.template({
			board: that.model
		});
		
		that.$el.html(renderedContent);
		return that;		
	},
	
	update: function(event) {
		event.preventDefault();
		
		var newTitle = $(event.currentTarget).serializeJSON().board.title;
		this.model.save({title: newTitle}, {wait: true});
	},
	
	leave: function() {
		this.off();
		this.remove();
	}
});
