TrelloClone.Routers.Boards = Backbone.Router.extend({
	initialize: function($rootEl, boards) {
		this.$rootEl = $rootEl;
		this.boards = boards;
	},
	
	routes: {
		"": "index",
		"/:id/create": "create",
		"/:board_id": "show"
	},
	
	create: function(id) {
		
	},
	
	show: function(board_id) {
		var board = this.boards.get(board_id);
		
		var newBoardView = new TrelloClone.Views.BoardDetail({
			model: board
		});
		
		this.$rootEl.html(newBoardView.render().$el);
	},
	
	index: function() {
		var that = this;
		var boards = that.boards;
		
		var newBoardsView = new TrelloClone.Views.BoardsIndex({
			collection: boards
		});

		that.$rootEl.html(newBoardsView.render().$el);
	}
});
