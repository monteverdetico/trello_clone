TrelloClone.Models.List = Backbone.Model.extend({
	parse: function(data) {
		// TODO: why is data null??
		data.cards = new TrelloClone.Collections.Cards(data.cards);
		return data;
	}
});
