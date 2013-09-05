TrelloClone.Views.ListsShow = Backbone.View.extend({

  initialize: function() {
  	this.listenTo(this.model, "change", this.render);
  },
	
	events: {
  	"click .editList": "editTitle"	
  },
	
	template: JST['lists/show'],
	
	className: "col-md-3",
	
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
		
		return that;
	}

});
