TrelloClone.Views.CardsShow = Backbone.View.extend({

  initialize: function() {
		this.childrenViews = [];
		this.listenTo(this.model, "change", this.render);
  },
	
	className: "list-group-item",
	
	events: {
		"click .delete": "deleteCard"
	},
	
	id: function() {
		return this.model.get('id');
	},
	
	deleteCard: function(event) {
		event.preventDefault();
		this.model.destroy();
		
		$('#editCard' + this.model.get('id')).modal('hide');
		$('.modal-backdrop').remove();
		$('body').removeClass('modal-open');		
	},
	
  template: JST['cards/show'],
	
	render: function() {
		var that = this;
		
		var renderedContent = that.template({
			card: that.model
		});
		
		that.$el.html(renderedContent);
		that._triggerDroppable();
		
		var commentsView = new TrelloClone.Views.CommentsShow({
			collection: that.model.get('comments'),
			id: that.model.id
		});
		
		that.childrenViews.push(commentsView);
		
		that.$('#comments').html(commentsView.render().$el);
		
		return that;
	},
	
	_triggerDroppable: function() {
		var that = this;
		
		that.$el.droppable({
			accept: ".member",
			drop: function(event, ui) {
				var assignedUser, cardAssignment, assignedUserId
				assignedUser = $(ui.draggable).text().trim();
				that.model.set({assigned_to: assignedUser});
				
				cardAssignment = that.model.get('card_assignments');
				assignedUserId = ui.draggable.attr('id').match(/\d/g).join("");
				
				if (cardAssignment.get('user_id')) {
					cardAssignment.save({user_id: assignedUserId});					
				} else {
					var cardId = that.model.get('id');
					cardAssignment.save({card_id: cardId, user_id: assignedUserId}, {wait: true});
				}
			}
		});
	},
	
	leave: function() {
		_.each(this.childrenViews, function(childView) {
			childView.leave();
		});
		
		this.off();
		this.remove();
	}
});
