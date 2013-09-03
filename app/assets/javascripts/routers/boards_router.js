TrelloClone.Routers.Boards = Backbone.Router.extend({
	initialize: function($rootEl, boards) {
		this.$rootEl = $rootEl;
		this.boards = boards;
	},
	
	routes: {
		"": "index"
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
