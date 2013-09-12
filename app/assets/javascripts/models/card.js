TrelloClone.Models.Card = Backbone.Model.extend({
	parse: function(data) {
		var assignmentData = data.card_assignments[0] || data.card_assignments
		
		data.card_assignments = new TrelloClone.Models.Assignment(assignmentData);
		data.comments = new TrelloClone.Collections.Comments(data.comments);		
		return data;
	}
});
