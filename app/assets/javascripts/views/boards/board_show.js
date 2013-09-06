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
	
	triggerSortable: function() {
		var hook = this.$el;
		var $lists = hook.find('#lists');
		
		$lists.sortable({
			tolerance: "pointer"
		});
			
		$lists.on("sortchange", function(event, ui) {
			// make ajax request to custom route that will handle
			// hash of list id and position
			// server should handle request and update positions
			
			console.log($lists);
			$lists.sortable("toArray");
			
		});
	}
	// THIS IS FOR CARDS
	// triggerSortable: function() {
	// 	var hook = this.$el;
	// 	
	// 	this.model.get('lists').each(function(list) {
	// 		var sortableList = "#list" + list.get('id');
	// 
	// 		hook.find(sortableList).sortable({
	// 			connectWith: ".col-md-3 .connectedSortable"
	// 		}).disableSelection();
	// 	});
	// }

});
