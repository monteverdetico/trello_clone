TrelloClone.Views.BoardShow = Backbone.View.extend({
	initialize: function() {
		var model = this.model;
		var lists = model.get('lists');
		
		this.listenTo(lists, "add", this.render);
	},
	
	events: {
		"submit #createList": "createList"
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
		
	render: function() {
		var that = this;

		var renderedContent = that.template({
			board: that.model
		});
		
		that.$el.html(renderedContent);
		
		that.model.get('lists').each(function(list) {

			var listView = new TrelloClone.Views.ListsShow({model: list});
			
			that.$('#lists').append(listView.render().$el);
		});
		
		return that;
	}

});
