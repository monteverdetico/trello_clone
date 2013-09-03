TrelloClone.Views.BoardsIndex = Backbone.View.extend({

  template: JST['boards/index'],
	
	render: function() {
		var that = this;
		
		var renderedContent = that.template({
			boards: that.collection
		});
		
		that.$el.html(renderedContent);
		return that;
	}

});
