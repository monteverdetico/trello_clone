TrelloClone.Collections.Cards = Backbone.Collection.extend({
	comparator: function(card) {
		return card.get("position");
	},
	
	url: "/cards",
	
  model: TrelloClone.Models.Card

});
