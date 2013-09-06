TrelloClone.Views.CardsShow = Backbone.View.extend({
	
	tagName: "li",
	
	className: "list-group-item",
	
	id: function() {
		return this.model.get('id');
	},
	
  template: JST['cards/show'],
	
	render: function() {
		var that = this;

		var renderedContent = that.template({
			card: that.model
		});
		
		that.$el.html(renderedContent);
		return that;
	}

});
