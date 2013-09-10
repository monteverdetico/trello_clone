TrelloClone.Models.Card = Backbone.Model.extend({
	parse: function(data) {
		data.comments = new TrelloClone.Collections.Comments(data.comments);		
		return data;
	}
});
