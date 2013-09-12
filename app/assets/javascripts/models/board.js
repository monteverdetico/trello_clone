TrelloClone.Models.Board = Backbone.Model.extend({
	parse: function(data) {
		data.lists = new TrelloClone.Collections.Lists(data.lists, {parse: true});
		data.members = new TrelloClone.Collections.Members(data.members);

		return data;
	}
});
