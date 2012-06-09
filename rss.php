<?php

  header('Content-Type: application/json');
  $feed = new DOMDocument();
  $feed->load('http://www.seppeisl.at/modules/news/rss2.php?page_id=1&group_id=7');

  $items = $feed->getElementsByTagName('channel')->item(0)->getElementsByTagName('item');

  foreach($items as $item){
    $title = $item->getElementsByTagName('title')->item(0)->firstChild->nodeValue;
    $description = $item->getElementsByTagName('description')->item(0)->firstChild->nodeValue;
    $pubDate = $item->getElementsByTagName('pubDate')->item(0)->firstChild->nodeValue;
    $link = $item->getElementsByTagName('link')->item(0)->firstChild->nodeValue;

    $item = (array) $item;
    $item['title'] = $title;
    $item['description'] = $description;
    $item['pubDate'] = $pubDate;
    $item['link'] = $link;

    unset($item['@attributes']);
    $final[] = $item; 
  }

  echo json_encode($final);

?>