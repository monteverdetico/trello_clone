TrelloClone.Views.ListsIndex = Backbone.View.extend({

  template: JST['lists/index'],
	
	className: "col-md-3",
	
	render: function() {
		var that = this;

		var renderedContent = that.template({
			list: that.model
		});
		
		that.$el.html(renderedContent);
		
		return that;
	}

});
