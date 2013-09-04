TrelloClone.Routers.Boards = Backbone.Router.extend({
	initialize: function($rootEl, boards) {
		this.$rootEl = $rootEl;
		this.boards = boards;
	},
	
	routes: {
		"": "index",
		":board_id": "show"
	},
		
	show: function(board_id) {
		var that = this;
		var board = that.boards.get(board_id);
		
		board.fetch({
			success: function(response) {
				var newBoardView = new TrelloClone.Views.BoardShow({
					model: response
				});
		
				that.$rootEl.html(newBoardView.render().$el);				
			}
		});
	},
	
	index: function() {
		var boards = this.boards;

		var newBoardsView = new TrelloClone.Views.BoardsIndex({
			collection: boards
		});

		this.$rootEl.html(newBoardsView.render().$el);
	}
});
