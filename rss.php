<?php
  header('Content-Type: application/json');
  $feed = new DOMDocument();
  $feed->load('http://www.seppeisl.at/modules/news/rss2.php?page_id=1&group_id=7');
  $json = array();

  # $json['title'] = $feed->getElementsByTagName('channel')->item(0)->getElementsByTagName('title')->item(0)->firstChild->nodeValue;
  # $json['description'] = $feed->getElementsByTagName('channel')->item(0)->getElementsByTagName('description')->item(0)->firstChild->nodeValue;
  # $json['link'] = $feed->getElementsByTagName('channel')->item(0)->getElementsByTagName('link')->item(0)->firstChild->nodeValue;

  $items = $feed->getElementsByTagName('channel')->item(0)->getElementsByTagName('item');


  $i = 0;

  foreach($items as $item) {
    $title = $item->getElementsByTagName('title')->item(0)->firstChild->nodeValue;
    $description = $item->getElementsByTagName('description')->item(0)->firstChild->nodeValue;
    $pubDate = $item->getElementsByTagName('pubDate')->item(0)->firstChild->nodeValue;
    $link = $item->getElementsByTagName('link')->item(0)->firstChild->nodeValue;

    $json[$i++]['title'] = $title;
    $json[$i++]['description'] = $description;
    $json[$i++]['pubdate'] = $pubDate;
    $json[$i++]['link'] = $link;   
    
  }

  #echo json_encode($json);
  echo ('[{"title":"Hochwasserschutz beginnt bei Uferpflege","description":"<img alt=\"\" height=\"393\" src=\"http:\/\/www.seppeisl.at\/media\/News_Eisl\/2012_05_Mai\/IMG_6671_pr_hp.jpg\" width=\"500\" \/>(10.5) Entlang der gro&szlig;en Fl&uuml;sse wie z.B. Salzach, Saalach, Klausbach, Almfluss, Mur, Taurach u.a. werden allj&auml;hrlich die Ufer von umgest&uuml;rzten B&auml;umen bzw. Bruchholz befreit. Weiters wird im Zuge dieser Arbeiten an den Ufern auch genau kontrolliert, ob B&auml;ume umzust&uuml;rzen drohen oder ob sie eine Gefahr darstellen.","pubDate":"Thu, 10 May 2012 16:19:00 +0200","link":"http:\/\/www.seppeisl.at\/pages\/posts\/hochwasserschutz-beginnt-bei-uferpflege-596.php"},{"title":"Neue Trinkwasserschule Wissensdatenbank online","description":"<img alt=\"\" height=\"336\" src=\"http:\/\/www.seppeisl.at\/media\/News_Eisl\/2012_05_Mai\/Eisl08051203hp.jpg\" width=\"441\" \/>(8.5.) Seit heute bietet die TrinkWasser!-Wissensdatenbank den teilnehmenden Lehrerinnen und Lehrern des Projektes n&uuml;tzliche R&auml;tsel, L&uuml;ckentexte, Projektleitf&auml;den, Forscherb&uuml;cher und Arbeitsbl&auml;tter rund um die Welt des Wassers f&uuml;r den Unterricht. Die Unterrichtsmaterialien stehen rund um die Uhr kostenlos zur Verf&uuml;gung.","pubDate":"Tue, 08 May 2012 23:19:00 +0200","link":"http:\/\/www.seppeisl.at\/pages\/posts\/neue-trinkwasserschule-wissensdatenbank-online-593.php"}]');
?>