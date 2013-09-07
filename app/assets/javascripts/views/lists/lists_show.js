TrelloClone.Views.ListsShow = Backbone.View.extend({

  initialize: function() {
		var cards = this.model.get('cards');
		
  	this.listenTo(this.model, "change", this.render);
		this.listenTo(cards, "add", this.render);
  },
	
	events: {
  	"click .editList": "editTitle",
		"click .newCard": "newCard"	
  },
	
	template: JST['lists/show'],
	
	className: "col-md-3",
	
	id: function() {
		return this.model.get('id');
	},
	
	newCard: function(event) {	
		var newCard = new TrelloClone.Views.CardForm({model: this.model});
		
		$(event.currentTarget.parentElement).html(newCard.render().$el);
	},
	
	editTitle: function(event) {
		var list = this.model
		
		var editForm = new TrelloClone.Views.ListForm({model: list});

		$(event.currentTarget.parentElement).html(editForm.render().$el);
	},
	
	render: function() {
		var that = this;

		var renderedContent = that.template({
			list: that.model
		});
		
		that.$el.html(renderedContent);
		
		that.model.get('cards').each(function(card) {
			var cardView = new TrelloClone.Views.CardsShow({model: card});
			that.$('#list-' + that.model.get('id')).append(cardView.render().$el);
		});
		
		that.triggerSortable();
		that.triggerConnectedSortable();
		
		return that;
	},
	
	_generatePositions: function(ids) {
		var newPositions = {};
		
		_.each(ids, function(id, i) {
			newPositions[id] = i;
		});
		
		return newPositions
	},
	
	triggerConnectedSortable: function() {
		var hook = this.$el;
		var connectedCards = "#list-" + this.model.get('id');
		
		hook.find(connectedCards).sortable({
			connectWith: ".connectedSortable",
			receive: function(event, ui) {
				var receiverId = $(event.target).attr('id').match(/\d/);
				var senderId = "";
				debugger
				console.log(event)
				// send data for two lists to update card positions
				// update list_attribute for moved card
				// use event and ui to generate data in helper
			}
		}).disableSelection();
	},
	
	triggerSortable: function() {
		var that = this;
		var hook = that.$el;
		var $lists = hook.find('.connectedSortable');

		var listId = that.model.get('id');
		var url = "/lists/" + listId + "/positions";
		
		$lists.sortable({
			tolerance: "pointer",
			update: function(event, ui) {
				var cardIds = $(this).sortable("toArray");
				var newPositions = {positions: that._generatePositions(cardIds)};
				
				$.ajax({
					url: url,
					data: newPositions,
					dataType: "json",
					type: "put",
					success: function(responseData) {
						that.model.get("cards").set(responseData, 
							{silent: true});
					}							
				});
			}
		});
	}

});
