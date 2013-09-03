window.TrelloClone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function($content, boards) {
		// TODO: write initialize function; what params should it get?
  }
};

$(function(){
	
	// TODO: what data should the app kick-off with?
	
	var boards = TrelloClone.Collections.Boards();
	
	boards.fetch({
		success: function(responseData) {
		  TrelloClone.initialize($(#content), responseData);			
		}
	});
});
