TrelloClone.Views.BoardShow = Backbone.View.extend({
	initialize: function() {
		var model = this.model;
		var lists = model.get('lists');
		
		this.listenTo(lists, "add", this.render);
		this.listenTo(lists, "change", this.render);
	},
	
	events: {
		"submit #createList": "createList",
		"click .list-click": "editTitle"
	},
	
  template: JST['boards/show'],
	
	createList: function(event) {
		event.preventDefault();
		
		var data = $(event.currentTarget).serializeJSON();
		var title = data.list.title;
		var board_id = this.model.id
		
		this.model.get('lists').create(
			{title: title, board_id: board_id},
			{wait: true});
		
		$('#newList').modal('hide');
		$('.modal-backdrop').remove();
		$('body').removeClass('modal-open');									
	},
	
	editTitle: function(event) {
		var listId = $(event.currentTarget).attr('data-id');
		var list = this.model.get('lists').get(listId)
		
		var editForm = new TrelloClone.Views.ListForm({model: list});

		$(event.currentTarget.parentElement).html(editForm.render().$el);
	},
	
	render: function() {
		var that = this;

		var renderedContent = that.template({
			board: that.model
		});
		
		that.$el.html(renderedContent);
		return that;
	}

});
