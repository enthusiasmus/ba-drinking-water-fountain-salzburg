$.ajax({
	async: true,
	dataType: "json",
	timeoutNumber: 5000,
	url: "db/elements.php",
	success: function(data){	
		placeMarkers(data);
	},
	error: function(data){
		alert("Die Trinkbrunnen konnten nicht geladen werden!");
	}
});

function getFeed() {
	$('#map_canvas').hide();
	$('#feed').show();

	$.get('rss.php', {
	  feed_url:'http://www.seppeisl.at/modules/news/rss2.php?page_id=1&group_id=7',
	}, function(xml) {
		 getFeedItems(xml);
	});
}
