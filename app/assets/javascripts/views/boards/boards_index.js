TrelloClone.Views.BoardsIndex = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, "add", this.render);
		// this.listenTo(this.collection, "destroy", this.render);
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
		
		$('#newBoard').modal('hide');
		$('.modal-backdrop').remove();
		$('body').removeClass('modal-open');		
	},
	
	render: function() {
		var that = this;
			
		var renderedContent = that.template({
			boards: that.collection
		});
		
		that.$el.html(renderedContent);
		return that;
	},
	
	leave: function() {
		this.off();
		this.remove();
	}
});
