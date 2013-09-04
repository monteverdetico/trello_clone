window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function($content, user_id) {
		// TODO: write initialize function; what params should it get?
		
		var boards = new TrelloClone.Collections.Boards(user_id);

		boards.fetch({
			success: function(response) {
				router = new TrelloClone.Routers.Boards($content, boards);
				
				Backbone.history.start();
			}
		});
  }
};
