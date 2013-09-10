window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function($content, user_id, data) {		
		var boards = new TrelloClone.Collections.Boards(user_id);
		boards.reset(data, {parse: true});
		
		router = new TrelloClone.Routers.Boards($content, boards);
		
		Backbone.history.start();
  }
};
