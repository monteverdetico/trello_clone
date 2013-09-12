TrelloClone.Views.CommentsShow = Backbone.View.extend({

	initialize: function() {
		this.listenTo(this.collection, "add", this.swap);
	},
	
	events: {
		"submit #addComment": "createComment"	
	},
	
	createComment: function(event) {
		event.preventDefault();
		
		var formData = $(event.currentTarget).serializeJSON();
		var commentBody = formData.comment.body.trim();
		var cardId = this.id;
		
		this.collection.create({body: commentBody, card_id: cardId}, {wait: true});
	},
	
  template: JST['comments/show'],
	
	render: function() {
		var that = this;
		
		var renderedContent = that.template({
			comments: that.collection
		});
		
		that.$el.html(renderedContent);

		return that;
	},
	
	swap: function() {
		this.off();
		this.render();
	},
		
	leave: function() {
		this.off();
		this.remove();
	}
});
