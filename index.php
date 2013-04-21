<?php
$isMobile = false;
$isIos = false;
$isIpad = false;
$isAndroid = false;

if (preg_match('/(alcatel|android|blackberry|benq|cell|elaine|htc|iemobile|iphone|ipad|ipaq|ipod|j2me|java|midp|mini|mobi|motorola|nokia|palm|panasonic|philips|phone|sagem|sharp|smartphone|sony|symbian|t-mobile|up\.browser|up\.link|vodafone|wap|wireless|xda|zte)/i', $_SERVER['HTTP_USER_AGENT']))
	$isMobile = true;

if (strstr($_SERVER['HTTP_USER_AGENT'], 'iPad') || strstr($_SERVER['HTTP_USER_AGENT'], 'iPhone') || strstr($_SERVER['HTTP_USER_AGENT'], 'iPod'))
	$isIos = true;

if (strstr($_SERVER['HTTP_USER_AGENT'], 'iPad'))
	$isIpad = true;

if (strstr($_SERVER['HTTP_USER_AGENT'], 'Android'))
	$isAndroid = true;
?>
<!DOCTYPE html>
<?php
if ($isMobile) {
	echo "<html>";
}
else {
	echo "<html>";
}
?>
<head>
  <meta content="text/html;charset=UTF-8" http-equiv="content-type">
  <?php if ($isMobile) {
  ?>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="apple-touch-icon-precomposed" href="assets/img/mobile/icon.png"/>
  <title>Wasser</title>
  <?php if($isIos) {
  ?>
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  <link rel="apple-touch-startup-image" href="assets/img/ios/startup-iphone.png" />
  <?php } ?>
  <?php } else { ?>
  <title>Wasser Land Salzburg</title>
  <link rel='icon' href='assets/img/website/favicon.png' type='image/png'/>
  <?php } ?>
  <meta name="description" content="Wasser Land Salzburg! Über 200 Trinkbrunnen im Land Salzburg!"/>
  <meta name="keywords" content="Trinken, Trinkwasser, Trinkbrunnen, Salzburg, Wasser, Land"/>
  <meta author="author" content="Wanko Lukas, Nicole Buchegger, Robert Koch, Landesregierung Salzburg"/>
  <link rel="stylesheet" type="text/css" media="screen" href="assets/css/reset.css" />
  <link rel="stylesheet" type="text/css" media="screen" href="assets/css/style.css" />
  <?php if ( $isIos ) {
  ?>
  <link rel="stylesheet" type="text/css" media="screen" href="assets/css/ios.css" />
  <?php } else if ( $isAndroid || $isMobile ) { ?>
  <link rel="stylesheet" type="text/css" media="screen" href="assets/css/ios.css" />
  <?php } else { ?>
  <link rel="stylesheet" type="text/css" media="screen" href="assets/css/website.css" />
  <link rel="stylesheet" type="text/css" media="screen" href="assets/css/nivo-slider.css" />
  <!--[if lt IE 9]>
  <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
  <?php } ?>
</head>
<body>
  <?php if ( !$isMobile ) {
  ?>
  <div id="wrap">
    <div id="slider" class="nivoSlider">
      <img src="assets/img/slider/06.jpg" class="slide" alt="" />
      <img src="assets/img/slider/01.jpg" class="slide" alt="" />
      <img src="assets/img/slider/03.jpg" class="slide" alt="" />
      <img src="assets/img/slider/04.jpg" class="slide" alt="" />
      <img src="assets/img/slider/05.jpg" class="slide" alt="" />
    </div>
    <div id="inner-wrap">
      <?php } ?>
      <header id="header">
        <?php if ( !$isMobile ) {
        ?>
        <hgroup>
          <h1 id="logo"><a href="javascript:void(0)" onclick="window.Trinkbrunnen.Router.index()">Wasser Land Salzburg</a></h1>
          <h2 id="logo_salzburg"><a href="http://www.salzburg.gv.at/wasser" target="_blank">Land Salzburg</a></h2>
        </hgroup>
        <?php } else { ?>
        <h1 id="logo">Land Salzburg</h1>
        <a href="javascript:void(0)" onclick='window.Trinkbrunnen.Router.index()' id="back">Zurück</a>
        <?php } ?>
        <nav id="header-navigation">
          <ul>
            <?php if ( !$isMobile ) {
            ?>
            <li class='menu-item show_map'>
              <a href='javascript:void(0)' onclick='window.Trinkbrunnen.Router.scrollMap()'>Karte</a>
            </li>
            <li class='menu-item feed'>
              <a href='javascript:void(0)' onclick='window.Trinkbrunnen.Router.showRssFeed()'>Wasser-News</a>
            </li>
            <!-- TODO: class menu-item and header or navigation + id is now standard -->
            <?php } ?>
            <li class='menu-item' id='header-lake'>
              <a href='javascript:void(0)' onclick='window.Trinkbrunnen.Router.showLakes()'>Seetemperaturen</a>
            </li>
            <li class='menu-item' id='header-about'>
              <a href='javascript:void(0)' onclick='window.Trinkbrunnen.Router.showAbout()'>Impressum</a>
            </li>
          </ul>
        </nav>
      </header>
      <?php if ( $isMobile ) { ?><
      div id="spin"><img src="assets/img/mobile/spin.gif"/>
    </div>
    <?php } ?>
    <div id='overlay'></div>
    <div id="info">
      <div id="info-content">
        <h2>Impressum / Kontakt</h2>
        <div  class="left">
          <p>
            <div id="salzburg-logo"></div>
          </p>
          <p>
            <b>Land Salzburg</b>
            <br>
            Landes-Medienzentrum
            <br>
            Information, Kommunikation und Marketing
            <br>
            Chiemseehof, Postfach 527
            <br>
            5010, Salzburg
            <br>
            <a href="http://www.salzburg.gv.at" target="_blank">www.salzburg.gv.at</a>
          </p>
        </div>
        <div class="right">
          <p>
            <div id="fh-logo"></div>
          </p>
          <p>
            Entwickelt in Zusammenarbeit mit:
            <br>
            <b>MultiMediaTechnology</b> &amp; <b>MultiMediaArt</b>
            <br>
            Studiengänge der Fachhochschule Salzburg
            <br>
            <a href="http://www.fh-salzburg.ac.at" target="_blank">www.fh-salzburg.ac.at</a>
          </p>
          <p>
            <i>Entwickler:</i> Lukas Wanko, Nicole Buchegger und Robert Koch
            <br/>
            <i>Designer:</i> Karin Schnirch und Philipp Fauser
            <br />
            <i>Natur-Fotos:</i> Karin Schnirch
          </p>
        </div>
        <h4>Wasser-App</h4>
        <p>
          Finden Sie einen Trinkbrunnen in Ihrer Nähe, um Ihren Durst zu stillen!
        </p>
        <p>
          Die Wasser-App des Landes Salzburg führt Sie zu mehr als 200 Trinkbrunnen im ganzen Land Salzburg, perfekt um auf dem schnellsten Weg mit frischem Trinkwasser den Durst zu stillen. Die App lokalisiert Ihre Position, um den nächstgelegenen Trinkbrunnen zu finden. Weiters können Sie jederzeit die aktuellen Badeseentemperaturen abrufen und den neusten News der Wasserwirtschaft nachgehen. Um die App zu nutzen ist eine Internetverbindung (Wifi oder 3G-Netz) erforderlich oder GPS, um Ihre Position zu lokalisieren.
        </p>
        <h4>Disclaimer – Haftungsausschlusserklärung</h4>
        <p>
          Diese Website/ Applikation dient zu Ihrer Information. Sie wird mit Sorgfalt bearbeitet. Sowohl für die Auswahl der einzelnen Verweise wie für die Beiträge in den Sparten kann für Vollständigkeit, Auswahl und inhaltliche Richtigkeit der Informationen keine Haftung übernommen werden. Der Betreiber kann für fremde Inhalte, die durch die angebotene Datenbank erreichbar sind (Links), keine Haftung übernehmen.
        </p>
        <p>
          Die Website/ Applikation kann insbesondere die persönliche Beratung im konkreten Einzelfall nicht ersetzen. Durch die zur Verfügung gestellten Informationen wird kein wie immer geartetes Rechtsverhältnis zwischen dem Land Salzburg und dem Nutzer begründet.
        </p>
        <p>
          Die auf der Website/ Applikation des Landes Salzburg veröffentlichten Beiträge sind urheberrechtlich geschützt. Jede unberechtigte Vervielfältigung und/oder Verbreitung dieser Seiten stellt eine Verletzung des österreichischen Urheberrechtsgesetzes dar.
        </p>
        <p>
          Dieser Haftungsausschluss ist als Teil des Internetangebotes zu betrachten, von dem aus auf diese Seite/ Applikation verwiesen wurde.
        </p>
      </div>
    </div>
    <div id="lakes">
      <div id="lakes-content">
        <div id="lakes-listing">
          <h2>Seetemperaturen</h2>
          <ul>
            <!-- lakes gets added here -->
          </ul>
          <?php if($isMobile){ ?>
			      <div id="reloading_lakes">
			        <div class="info_offline">Bitte verbinden Sie sich mit dem Internet!</div>
			        <div class="reload_button"></div>
			      </div>
		      <?php } ?>
          <p style="clear: both;"></p>
          <p>
            Seetemperatur [°C] gemessen 50 cm unter der Wasseroberfläche.
          </p>
        </div>
        <div id="lakes-graphics">
          <?php if ( !$isMobile ) {
          ?>
          <!--<h2>Salzburger Vorlandseen</h2>
          <img src="http://www.salzburg.gv.at/2043wiskiweb/APP_See_WT_Vorlandseen_KiBasicGrafikenWTVorlandsee.png"/>
          <h2>Salzburger Bergseen</h2>
          <img src="http://www.salzburg.gv.at/2043wiskiweb/APP_See_WT_Berglandseen_KiBasicGrafikenWTBerglandseen.png"/>-->
          <?php } else { ?>
          <p>
            <a href="javascript:void(0)" onclick="window.Trinkbrunnen.Router.downloadGraphic('north');">Salzburger Vorlandseen</a>
          </p>
          <p>
            <a href="javascript:void(0)" onclick="window.Trinkbrunnen.Router.downloadGraphic('south');">Salzburger Berglandseen</a>
          </p>
          <?php } ?>
        </div>
      </div>
    </div>
    <div id="feed">
    	<?php if($isMobile){ ?>
      <div id="reloading_feed">
        <div class="info_offline">Bitte verbinden Sie sich mit dem Internet!</div>
        <div class="reload_button"></div>
      </div>
      <?php } ?>
      <?php if ( !$isMobile ) {
      ?>
      <a href="javascript:void(0)" id="prev" class="prev">Neuere Wasser-News</a>
      <div id="rss_content">
        <?php } ?>
        <section id="rss"></section>
        <?php if ( !$isMobile ) {
        ?>
      </div>
      <a href="javascript:void(0)" id="next" class="next">Ältere Wasser-News</a>
      <?php } ?>
    </div>
    <?php if ( !$isMobile ) {
    ?>
    <div id="appinfo">
      <h3 id="slogan"><span>App mit über 200 Trinkbrunnen</span>
      <br>
      <span>im ganzen Land Salzburg</span></h3>
      <a href="http://itunes.apple.com/at/app/wasser-land-salzburg/id544685735?mt=8" id="appstore">Availiable on the App Store</a>
      <a href="http://play.google.com/store/apps/details?id=at.sbg.fh.mmt.wasser" id="googleplay">Google play</a>
      <br>
      <div id="latest_feed"></div>
    </div>
    <span id="left-hand-phone"></span>
    <span id="right-hand-phone"></span>
  </div>
  </div>
  <?php } ?>
  <?php if($isMobile){
  ?>
  <nav id="navigation">
    <ul>
      <li id='navigation-position' class='menu-item'>
        <a href='javascript:void(0)' onclick='window.Trinkbrunnen.Router.getUserLocation()'><span></span>Position</a>
      </li>
      <li id='navigation-address' class='menu-item'>
        <a href='javascript:void(0)' onclick='window.Trinkbrunnen.Router.showAddressSearch()'><span></span>Adresse</a>
      </li>
      <li id='navigation-fountain' class='menu-item'>
        <a href='javascript:void(0)' onclick='window.Trinkbrunnen.Router.nextFountain()'><span></span>Brunnen</a>
      </li>
      <li id='navigation-maptype' class='menu-item'>
        <a href='javascript:void(0)' onclick='window.Trinkbrunnen.Router.showMaptype()'><span></span>Kartentyp</a>
      </li>
      <li id='navigation-feed' class='menu-item'>
        <a href='#feed'><span></span>News</a>
      </li>
    </ul>
  </nav>
  <?php } ?>
  <div id="map-wrap">
    <?php if(!$isMobile){ ?>
    <nav id="navigation">
      <ul>
        <li id='navigation-position' class='menu-item'>
          <a href='javascript:void(0)' onclick='window.Trinkbrunnen.Router.getUserLocation()'><span></span>Position</a>
        </li>
        <li id='navigation-address' class='menu-item'>
          <a href='javascript:void(0)' onclick='window.Trinkbrunnen.Router.showAddressSearch()'><span></span>Adresse</a>
        </li>
        <li id='navigation-fountain' class='menu-item'>
          <a href='javascript:void(0)' onclick='window.Trinkbrunnen.Router.nextFountain()'><span></span>Brunnen</a>
        </li>
        <li id='navigation-cluster' class='menu-item'>
          <a href='javascript:void(0)' onclick='window.Trinkbrunnen.Router.toggleClusterSingled()'><span></span>Gruppe</a>
        </li>
      </ul>
    </nav>
    <div id="scroll-wrap">
      <a href="javascript:void(0)" onclick='window.Trinkbrunnen.Router.scrollMap()' id="scroll">Karte vergrößern &uarr;</a>
    </div>
    <?php } ?>
    <div id="map_canvas">
    	<?php if($isMobile){ ?>
      <div id="reloading_map" class="reload_first">
      	<div>
	        <div class="info_offline">Bitte verbinden Sie sich mit dem Internet!</div>
	        <div class="reload_button"></div>
	      </div>
      </div>
      <?php } ?>
    </div>
    <?php if($isMobile){ ?>
    <div id="reloading_fountains" class="reload_second">
     <div>
      <span class="info_offline">Bitte verbinden Sie sich mit dem Internet!</span>
      <span class="reload_button"></span>
     </div>
    </div>
    <?php } ?>
    <div id="maptype">
      <div>
        <ul>
          <li class='menu-item'>
            <a href='#maptype/roadmap'>Straße</a>
          </li>
          <li class='menu-item'>
            <a href='#maptype/satellite'>Satellit</a>
          </li>
          <li class='menu-item'>
            <a href='#maptype/hybrid'>Hybrid</a>
          </li>
          <li class='menu-item'>
            <a href='#maptype/terrain'>Terrain</a>
          </li>
        </ul>
      </div>
    </div>
    <?php if(!$isMobile){ ?>
    <div id="failure">
      <div id="failure_message"></div>
      <div id="failure_close_button"></div>
    </div>
    <?php } ?>
    <div id="address">
      <input type='text' name='address' placeholder='Bitte geben Sie eine Adresse ein' class='addressinput'/>
      <input type='button' name='search_address' class='searchsubmit' value='Suche' />
      <div id="search_close_button"></div>
    </div>
  </div>
  <?php if($isMobile){ ?>
  <div id="failure">
    <div id="failure_message"></div>
    <div id="failure_close_button"></div>
  </div>
  <?php } ?>
  <?php if ( !$isMobile ) {
  ?>
  <a href="javascript:void(0)" onclick='window.Trinkbrunnen.Router.scrollMap()' id="activatemap"></a>
  <?php } ?>
  <script type="text/javascript" id="script-google-map" src="https://maps.google.com/maps/api/js?libraries=geometry&amp;sensor=true&amp;region=AT"></script>
  <!-- libs -->
  <script type="text/javascript" src="assets/js/libs/markerclusterer.js"></script>
  <script type="text/javascript" src="assets/js/libs/infobox.js"></script>
  <script type="text/javascript" src="assets/js/libs/jquery.js"></script>
  <script type="text/javascript" src="assets/js/libs/jquery.dateFormat.js"></script>
  <?php if ( !$isMobile ) {
  ?>
  <script type="text/javascript" src="assets/js/libs/jquery.nivo.slider.js"></script>
  <?php } ?>
  <script type="text/javascript" src="assets/js/libs/json2.js"></script>
  <script type="text/javascript" src="assets/js/libs/underscore.js"></script>
  <script type="text/javascript" src="assets/js/libs/backbone.js"></script>
  <!--templates -->
  <?php
	include "assets/templates/article.html";
	include "assets/templates/lake_temperature.html";
  ?>
  <!--models -->
  <script type="text/javascript" src="assets/js/models/feedItem.js"></script>
  <script type="text/javascript" src="assets/js/models/feed.js"></script>
  <script type="text/javascript" src="assets/js/models/lake.js"></script>
  <script type="text/javascript" src="assets/js/models/map.js"></script>
  <script type="text/javascript" src="assets/js/models/marker.js"></script>
  <script type="text/javascript" src="assets/js/models/userLocation.js"></script>
  <!-- views -->
  <script type="text/javascript" src="assets/js/views/address.js"></script>
  <script type="text/javascript" src="assets/js/views/feed.js"></script>
  <script type="text/javascript" src="assets/js/views/lakes.js"></script>
  <script type="text/javascript" src="assets/js/views/mapType.js"></script>
  <script type="text/javascript" src="assets/js/views/map.js"></script>
  <!-- collections -->
  <script type="text/javascript" src="assets/js/collections/marker.js"></script>
  <script type="text/javascript" src="assets/js/collections/lake.js"></script>
  <script type="text/javascript" src="assets/js/collections/feedItem.js"></script>
  <!-- router -->
  <script type="text/javascript" src="assets/js/router.js"></script>
  <script type="text/javascript" src="assets/js/main.js"></script>
  <script type="text/javascript" src="assets/js/messages.js"></script>
  <!-- stats -->
  <?php
	if (!$isMobile) {
		include "stats/stats.php";
	}
  ?>
  <!-- DEBUGGING BEGIN
  <div style="position:absolute; background: rgba(200, 54, 54, 0.5); z-index:99; top:30%; right:0px; width:100px; height:100px; color:white; padding:5px;">
  Debugging
  <input type="button" value="messages" onclick="Debugging.failureMessagesQueue();"/>
  <input type="button" value="userlocation" onclick="Debugging.userLocationChange();"/>
  <input type="button" value="map-wrap" onclick="$('#map-wrap').toggle();"/>
  </div>
  <script type="text/javascript" src="assets/js/debug.js"></script>
  <!-- DEBUGGING END -->
</body>
</html>