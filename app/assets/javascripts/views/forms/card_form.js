TrelloClone.Views.CardForm = Backbone.View.extend({

	template: JST['forms/createCard'],
	
	events: {
		"submit #createCard": "create"
	},
	
	render: function() {
		var that = this;
		
		var renderedContent = that.template();
		
		that.$el.html(renderedContent);
		return that;		
	},
	
	create: function(event) {
		event.preventDefault();

		var listId = this.model.get('id');
		var cardBody = $(event.currentTarget).serializeJSON().card.body;
				
		this.model.get('cards').create({list_id: listId, body: cardBody}, 
			{wait: true});
	}

});
