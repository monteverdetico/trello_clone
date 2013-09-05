TrelloClone.Models.List = Backbone.Model.extend({
	parse: function(data) {
		debugger
		data.cards = new TrelloClone.Collections.Cards(data.cards);
		return data;
	}
});
