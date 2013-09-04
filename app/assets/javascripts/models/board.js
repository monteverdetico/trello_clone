TrelloClone.Models.Board = Backbone.Model.extend({
	parse: function(data) {
		data.lists = new TrelloClone.Collections.Lists(data.lists, {parse: true});
		return data;
	}
});
