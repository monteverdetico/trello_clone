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
			// on drop success add member to html
			// assign card to member
			// one member per card
			drop: function(event, ui) {
				var assignedUser, cardAssignment, assignedUserId
				// should assign a member to a card
				// if a member is there new member should be assigned and old member should be unassigned
				// add member to card "collection" and trigger add event
				// item is no longer draggable
				// ui.helper will give you helper element
				assignedUser = $(ui.draggable).text().trim();
				that.model.set({assigned_to: assignedUser});
				
				cardAssignment = that.model.get('card_assignments');
				assignedUserId = ui.draggable.attr('id').match(/\d/g).join("");
				debugger
				
				if (cardAssignment.get('user_id')) {
					cardAssignment.save({user_id: assignedUserId});					
				} else {
					var cardId = that.model.get('id');
					cardAssignment.save({card_id: cardId, user_id: assignedUserId}, {wait: true});
				}
				
				console.log("dropped")
				// that.model.set({assigned_to: assignedUser});
			},
			
			out: function(event, ui) {			
				// should allow for draggable item to be dragged into empty space to unassign member from card
			}
		});
	},
	
	// swap: function() {
	// 	this.leave();
	// 	this.render();
	// },
	
	leave: function() {
		_.each(this.childrenViews, function(childView) {
			childView.leave();
		});
		
		this.off();
		this.remove();
	}
});
