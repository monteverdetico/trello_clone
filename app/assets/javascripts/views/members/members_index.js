TrelloClone.Views.MembersIndex = Backbone.View.extend({

  initialize: function() {
  	this.listenTo(this.collection, "add", this.render);
  },
	
	template: JST['members/index'],
			
	render: function() {
		var that = this;

		var renderedContent = that.template({
			members: that.collection
		});
		
		that.$el.html(renderedContent);
		that._triggerDraggable();
		that._triggerTypeAhead();
		
		return that;
	},
	
	_triggerDraggable: function() {
		var that = this;
		
		that.collection.each(function(member) {
			var memberId = member.get('id');
			that.$("#member-" + memberId).draggable({
				helper: "clone", 
				cursor: "move",
				snapMode: "both",
				zIndex: 10
			});
		});
	},
	
	_triggerTypeAhead: function() {
		var that = this;
		var boardId = that.id.match(/\d/g).join("");
		
		that.$('.typeahead').typeahead({
			name: 'members',
			prefetch: '/users.json',
			ttl: 0
		});
		
		that.$('.typeahead').on('typeahead:autocompleted', function(event, obj){
			if (that.collection.findWhere({username: obj.value})) {
				that.render();
			} else {
				that.collection.create({board_id: boardId, username: obj.value}, {wait: true});				
			}
		});
		
		that.$('.typeahead').on('typeahead:selected', function(event, obj){
			if (that.collection.findWhere({username: obj.value})) {
				that.render();
			} else {
				that.collection.create({board_id: boardId, username: obj.value}, {wait: true});				
			}
		});		
	}
});
