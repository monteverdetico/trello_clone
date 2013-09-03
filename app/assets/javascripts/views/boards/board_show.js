TrelloClone.Views.BoardShow = Backbone.View.extend({

  template: JST['boards/show'],
	
	render: function() {
		var that = this;
		
		var renderedContent = that.template({
			boards: that.collection
		});
		
		that.$el.html(renderedContent);
		return that;
	}

});
