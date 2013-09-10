TrelloClone.Views.CardsShow = Backbone.View.extend({

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
		return that;
	},
	
	leave: function() {
		this.off();
		this.remove();
	}
});
