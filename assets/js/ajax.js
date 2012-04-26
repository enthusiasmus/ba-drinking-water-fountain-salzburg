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
	$.get('/qpt2b/trinkbrunnen_salzburg_webapp/rss.php', {
	  feed_url:'http://www.seppeisl.at/modules/news/rss.php?page_id=1'
	}, function(xml) {
	  $(xml).find('item').each(function() {
	    $('#rss').append(
	    	'<article>' + 
	    	'<h3 class="feed-title"><a href="' + $(this).find('link').text() + '">' + $(this).find('title').text() + '</a></h3>' + 
	    	'<p class="feed-date">' + $(this).find('pubDate').text() + '</p>' + 
	 			'<div class="feed-content">' + $(this).find('description').text() + '</div>' +
	    	'</article>');  
	    $('.loading').hide();
	  });
	});
}
