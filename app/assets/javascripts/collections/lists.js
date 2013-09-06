TrelloClone.Collections.Lists = Backbone.Collection.extend({
	
	comparator: function(list) {
		return list.get("position");
	},
	
	url: "/lists",
	
  model: TrelloClone.Models.List

});
