TrelloClone.Views.BoardsIndex = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, "add", this.render);
	},
  
	events: {
		"submit #createBoard": "new"
	},
	
	template: JST['boards/index'],
	
	new: function(event) {
		event.preventDefault();
		
		var data = $(event.currentTarget).serializeJSON();
		var title = data.board.title;

		this.collection.create({
			title: title
		});
		debugger
		$('#newBoard').modal('hide')
		// TODO: makes sense to navigate to new board
	},
	
	render: function() {	
		var renderedContent = this.template({
			boards: this.collection
		});
		
		this.$el.html(renderedContent);
		return this;
	}

});
