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

		var newBoardView = new TrelloClone.Views.BoardShow({
			model: board
		});

		that.swap(newBoardView);
	},
	
	index: function() {
		var boards = this.boards;
		
		var newBoardsView = new TrelloClone.Views.BoardsIndex({
			collection: boards
		});
		
		this.swap(newBoardsView);
	},
	
	swap: function(newView) {	
		if (this.currentView) {
			this.currentView.leave();
		}
		
		this.currentView = newView;
		this.$rootEl.empty().append(this.currentView.render().$el)
	}
});
