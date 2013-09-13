TrelloClone.Views.ListsShow = Backbone.View.extend({

  initialize: function() {
		this.childrenViews = [];
		var cards = this.model.get('cards');
		
  	this.listenTo(this.model, "change", this.swap);
		this.listenTo(cards, "add", this.swap);
		this.listenTo(cards, "destroy", this.swap);
  },
	
	events: {
  	"click .editList": "editTitle",
		"click .newCard": "newCard",
		"click .delete": "deleteList"	
  },
	
	template: JST['lists/show'],
	
	className: "col-md-3",
	
	id: function() {
		return this.model.get('id');
	},
	
	deleteList: function(event) {
		event.preventDefault();
		this.model.destroy();
	},
	
	newCard: function(event) {
		// hide "create card" button
		var id = this.model.get('id');
		$('#createCardButton-' + id).toggleClass('hidden');
		
		// render card form view
		var newCard = new TrelloClone.Views.CardForm({model: this.model});
		$('#createCardForm-' + id).empty();
		$('#createCardForm-' + id).html(newCard.render().$el).toggleClass('hidden');
	},
	
	create: function(event) {
		event.preventDefault();

		var listId = this.model.get('id');
		var cardBody = $(event.currentTarget).serializeJSON().card.body;
				
		this.model.get('cards').create({list_id: listId, body: cardBody}, 
			{wait: true});
	},
	
	editTitle: function(event) {
		var list = this.model
		
		var editForm = new TrelloClone.Views.ListForm({model: list});
		this.childrenViews.push(editForm);

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
			that.childrenViews.push(cardView);
			
			that.$('#list-' + that.model.get('id')).append(cardView.render().$el);
		});

		that._triggerConnectedSortable();
		
		return that;
	},
	
	swap: function() {
		_.each(this.childrenViews, function(cardView) {
			cardView.leave();
		}, this);

		this.render();
	},
	
	_generatePositions: function(ids) {
		var newPositions = {};
		
		_.each(ids, function(id, i) {
			newPositions[id] = i;
		});
		
		return newPositions
	},
	
	_triggerConnectedSortable: function() {
		var that = this;
		var hook = that.$el;
		var connectedCards = "#list-" + that.model.get('id');
		
		hook.find(connectedCards).sortable({
			connectWith: ".connectedSortable",

			remove: function(event, ui) {
				var listId = that.model.get('id');
				var cards = $(event.target).sortable("toArray");
				var newPositions = {positions: that._generatePositions(cards)}; 
				var url = "/lists/" + listId + "/positions";
				
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
			},
			
			receive: function(event, ui) {
				var listId = that.model.get('id');
				var cards = $(event.target).sortable("toArray");
				var url = "/lists/" + listId + "/positions";
				
				var movedCardId = $(ui.item).attr('id');
				var movedCardBody = $(ui.item).html().trim();
				
				var allData = {positions: that._generatePositions(cards), 
										card: {id: movedCardId}};
		
				$.ajax({
					url: url,
					data: allData,
					dataType: "json",
					type: "put",
					success: function(responseData) {
						that.model.get("cards").set(responseData, 
							{silent: true});
					},						
				});
			},
			// currently redundant; three ajax requests are sent when sorting across lists; can sortable and connected sortable be separate??
			update: function(event, ui) {
				var listId = that.model.get('id');
				var cards = $(event.target).sortable("toArray");
				var newPositions = {positions: that._generatePositions(cards)}; 
				var url = "/lists/" + listId + "/positions";
				
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
		}).disableSelection();
	},
	
	leave: function() {
		_.each(this.childrenViews, function(childView) {
			childView.leave();
		});

		this.off();
		this.remove();
	}
});
