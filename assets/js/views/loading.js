var LoadingView = Backbone.View.extend({
	el: $('#loading'),
	initialize: function(){
		this.render();
	},
	spinner: '',
	render: function(){
		var opts = {
		  lines: 13, // The number of lines to draw
		  length: 4, // The length of each line
		  width: 4, // The line thickness
		  radius: 8, // The radius of the inner circle
		  rotate: 0, // The rotation offset
		  color: '#000', // #rgb or #rrggbb
		  speed: 0.8, // Rounds per second
		  trail: 66, // Afterglow percentage
		  shadow: false, // Whether to render a shadow
		  hwaccel: false, // Whether to use hardware acceleration
		  className: 'spinner', // The CSS class to assign to the spinner
		  zIndex: 2e9, // The z-index (defaults to 2000000000)
		  top: 'auto', // Top position relative to parent in px
		  left: 'auto' // Left position relative to parent in px
		};
		var target = document.getElementById('loading');
		this.spinner = new Spinner(opts).spin(target);
	},
	show: function(){
		$(this.el).show();
		this.spinner.spin(document.getElementById('loading'));
	},
	hide: function(){
		$(this.el).hide();
		this.spinner.stop();
	}
});
