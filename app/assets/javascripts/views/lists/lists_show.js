TrelloClone.Views.ListsShow = Backbone.View.extend({

  initialize: function() {
		var cards = this.model.get('cards');
		
  	this.listenTo(this.model, "change", this.render);
		this.listenTo(cards, "add", this.render);
  },
	
	events: {
  	"click .editList": "editTitle",
		"click .newCard": "newCard"	
  },
	
	template: JST['lists/show'],
	
	className: "col-md-3",
	
	newCard: function(event) {	
		var newCard = new TrelloClone.Views.CardForm({model: this.model});
		
		$(event.currentTarget.parentElement).html(newCard.render().$el);
	},
	
	editTitle: function(event) {
		var list = this.model
		
		var editForm = new TrelloClone.Views.ListForm({model: list});

		$(event.currentTarget.parentElement).html(editForm.render().$el);
	},
	
	render: function() {
		var that = this;

		var renderedContent = that.template({
			list: that.model
		});
		
		that.$el.html(renderedContent);
		
		that.model.get('cards').each(function(card) {

			var cardView = new TrelloClone.Views.CardsShow({model: card});
			
			that.$('#cards').append(cardView.render().$el);
		});
		
		return that;
	}

});
