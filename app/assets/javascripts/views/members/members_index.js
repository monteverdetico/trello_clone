TrelloClone.Views.MembersIndex = Backbone.View.extend({

  initialize: function() {
  	this.listenTo(this.collection, "")
  },
	
	template: JST['members/index'],
	
	render: function() {
		var that = this;

		var renderedContent = that.template({
			members: that.collection
		});
		
		that.$el.html(renderedContent);
		that._triggerDraggable();
		
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
	}
});
