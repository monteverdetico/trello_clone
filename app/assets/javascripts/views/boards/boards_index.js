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

		this.collection.create({title: title}, {wait: true});
		
		// TODO: uniqueness validation for title?
		
		$('#newBoard').modal('hideModal');
		$('.modal-backdrop').remove();		
	},
	
	render: function() {
		var that = this;
			
		var renderedContent = that.template({
			boards: that.collection
		});
		
		that.$el.html(renderedContent);
		return that;
	}

});
