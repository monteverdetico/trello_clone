TrelloClone.Models.List = Backbone.Model.extend({
	parse: function(data) {
		data.cards = new TrelloClone.Collections.Cards(data.cards);
		return data;
	}
});
