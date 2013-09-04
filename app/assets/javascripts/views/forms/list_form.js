TrelloClone.Views.ListForm = Backbone.View.extend({
  template: JST['forms/editList'],
	
	events: {
		"submit #editList": "update"
	},
	
	render: function() {
		var that = this;
		
		var renderedContent = that.template({
			list: that.model
		});
		
		that.$el.html(renderedContent);
		return that;		
	},
	
	update: function(event) {
		event.preventDefault();
	}

});
