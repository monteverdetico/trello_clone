TrelloClone.Views.CardForm = Backbone.View.extend({

	template: JST['forms/createCard'],
	
	events: {
		"submit #createCard": "create",
		"click .close": "close"
	},
	
	render: function() {
		var that = this;
		
		var renderedContent = that.template();
		
		that.$el.html(renderedContent);
		return that;		
	},
	
	close: function(event) {
		event.preventDefault();
		this.leave();
		
		var id = this.model.id;
		$('#createCardForm-' + id).toggleClass('hidden');
		$('#createCardButton-' + id).toggleClass('hidden');
	},
	
	create: function(event) {
		event.preventDefault();

		var listId = this.model.get('id');
		var cardBody = $(event.currentTarget).serializeJSON().card.body;
				
		this.model.get('cards').create({list_id: listId, body: cardBody}, 
			{wait: true});
	},
	
	leave: function() {
		this.off();
		this.remove();
	}
});
