<?php

  header('Content-type: application/json; charset=utf-8;');
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
    $item['description'] = strip_tags($description, '<img>');
    $item['pubDate'] = $pubDate;
    $item['link'] = $link;

    unset($item['@attributes']);
    $final[] = $item; 
  }

  $final = json_encode($final);
  $final = str_replace("&auml;", "ä", $final);
  $final = str_replace("&uml;", "Ä", $final);
  $final = str_replace("&ouml;", "ö", $final);
  $final = str_replace("&Ouml;", "Ö", $final);
  $final = str_replace("&uuml;", "ü", $final);
  $final = str_replace("&Uuml;", "Ü", $final);
  $final = str_replace("&szlig;", "ß", $final);
  
  echo $final;

?>