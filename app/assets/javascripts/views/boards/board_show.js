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

		// TODO: Refactor into helper method.
		
		that.model.get('lists').each(function(list) {

			var listView = new TrelloClone.Views.ListsShow({model: list});
			
			that.$('#lists').append(listView.render().$el);
		});
		
		that.triggerSortable();
		
		return that;
		
	},
	
	_generatePositions: function(listIds) {
		var newPositions = {};
		
		_.each(listIds, function(listId, i) {
			newPositions[listId] = i;
		});
		
		return {positions: newPositions}
	},
	
	triggerSortable: function() {
		var that = this;
		var hook = that.$el;
		var $lists = hook.find('#lists');

		var userId = that.model.get('user_id');
		var boardId = that.model.get('id');
		var url = "/users/" + userId + "/boards/" + boardId + "/positions";
		
		$lists.sortable({
			tolerance: "pointer",
			update: function(event, ui) {
				var listIds = $(this).sortable("toArray");
				var newPositions = that._generatePositions(listIds);
				
				$.ajax({
					url: url,
					data: newPositions,
					dataType: "json",
					type: "put",
					success: function(responseData) {
						that.model.get("lists").set(responseData, 
							{silent: true, parse: true});
					}							
				});
			}
		});
	}
});
