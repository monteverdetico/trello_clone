TrelloClone.Collections.Boards = Backbone.Collection.extend({
	initialize: function(user_id) {
		this.user_id = user_id;
	},
	
	url: function() {
		return "/users/" + this.user_id + "/boards"
	},
	
  model: TrelloClone.Models.Board

});
