TrelloClone.Views.CardsShow = Backbone.View.extend({

  initialize: function() {
		this.childrenViews = [];
  },
	
	className: "list-group-item",
	
	events: {
		"click .delete": "deleteCard"
	},
	
	id: function() {
		return this.model.get('id');
	},
	
	deleteCard: function(event) {
		event.preventDefault();
		this.model.destroy();
		
		$('#editCard' + this.model.get('id')).modal('hide');
		$('.modal-backdrop').remove();
		$('body').removeClass('modal-open');		
	},
	
  template: JST['cards/show'],
	
	render: function() {
		var that = this;
		
		var renderedContent = that.template({
			card: that.model
		});
		
		that.$el.html(renderedContent);
		
		var commentsView = new TrelloClone.Views.CommentsShow({
			collection: that.model.get('comments'),
			id: that.model.id
		});
		
		that.childrenViews.push(commentsView);
		
		that.$('#comments').html(commentsView.render().$el);
		
		return that;
	},
	
	leave: function() {
		_.each(this.childrenViews, function(childView) {
			childView.leave();
		});
		
		this.off();
		this.remove();
	}
});
