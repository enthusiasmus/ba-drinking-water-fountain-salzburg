$.ajax({
	async: true,
	dataType: "json",
	timeoutNumber: 5000,
	url: "db/elements.php",
	success: function(data){	
		createMarkers(data);
	},
	error: function(data){
		alert("Die Trinkbrunnen konnten nicht geladen werden!");
	}
});

// feed
function getFeed() {
	$('#map_canvas').hide();
	$.get('/qpt2b/trinkbrunnen_salzburg_webapp/rss.php', {
	  feed_url:'http://www.seppeisl.at/modules/news/rss.php?page_id=1',
	}, function(xml) {
		 getFeedItems(xml);
	});
}
