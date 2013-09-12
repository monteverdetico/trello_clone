TrelloClone.Models.Card = Backbone.Model.extend({
	parse: function(data) {
		data.card_assignments = new TrelloClone.Models.Assignment(data.card_assignments[0]);
		data.comments = new TrelloClone.Collections.Comments(data.comments);		
		return data;
	}
});
