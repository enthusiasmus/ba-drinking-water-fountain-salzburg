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
if($isMobile){
  echo "<html>";
}
else{
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
    <link rel="stylesheet" type="text/css" media="screen" href="assets/css/mobile.css" />
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
              <?php } ?>
              <li class='menu-item lake' id='header-lake'>
                <a href='javascript:void(0)' onclick='window.Trinkbrunnen.Router.showLakes()'>Seetemperaturen</a>
              </li>
              <li class='menu-item about' id='header-about'>
                <a href='javascript:void(0)' onclick='window.Trinkbrunnen.Router.showAbout()'>Impressum</a>
              </li>
            </ul>
          </nav>
        </header>
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
            <h2>Seetemperaturen</h2>
            <ul>
              <li>
                <ul>
                  <li>
                    <h3>Fuschlsee</h3>
                    <span>Fuschl am See</span>
                  </li>
                  <li>
                   <big>4.8 °C</big>
                  </li>
                  <li>
                    17:30 14.12.2012
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    <h3>Grabensee</h3>
                    <span>Grabensee</span>
                  </li>
                  <li>
                    <big>4.8 °C</big>
                  </li>
                  <li>
                    17:30 14.12.2012
                  </li>
                </ul>
              </li>
              <li>

                <ul>
                  <li>
                    <h3>Mattsee</h3>
                    <span>Mattsee</span>
                  </li>
                  <li>
                    <big>4.8 °C</big>
                  </li>
                  <li>
                    17:30 14.12.2012
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    <h3>Obertrumer See</h3>
                    <span>Obertrum</span>
                  </li>
                  <li>
                    <big>14.8 °C</big>
                  </li>
                  <li>
                    17:30 14.12.2012
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    <h3>Wolfgangsee</h3>
                    <span>St. Gilgen</span>
                  </li>
                  <li>
                     <big>14.8 °C</big>
                  </li>
                  <li>
                    17:30 14.12.2012
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    <h3>Wallersee</h3>
                    <span>Wallersee</span>
                  </li>
                  <li>
                    <big>24.8 °C</big>
                  </li>
                  <li>
                    23:30 30.02.2022
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    <h3>Zeller See</h3>
                    <span>Zell am See</span>
                  </li>
                  <li>
                    <big>34.8 °C</big>
                  </li>
                  <li>
                    17:30 14.12.2012
                  </li>
                </ul>
              </li>
            </ul>
            <p style="clear: both;"></p>
          </div>
        </div>
        <div id="feed">
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
        <li id='navi-position' class='menu-item position'>
          <a href='javascript:void(0)' onclick='window.Trinkbrunnen.Router.getUserLocation()'><span></span>Position</a>
        </li>
        <li id='navi-address' class='menu-item address'>
          <a href='javascript:void(0)' onclick='window.Trinkbrunnen.Router.showAddressSearch()'><span></span>Adresse</a>
        </li>
        <li id='navi-fontain' class='menu-item fontain'>
          <a id='fontain_toggle' href='javascript:void(0)' onclick='window.Trinkbrunnen.Router.nextFountain()'><span></span>Brunnen</a>
        </li>
        <li id='navi-maptype' class='menu-item maptype'>
          <a href='javascript:void(0)' onclick='window.Trinkbrunnen.Router.showMaptype()'><span></span>Kartentyp</a>
        </li>
        <li id='navi-feed' class='menu-item feed'>
          <a href='#feed'><span></span>News</a>
        </li>
      </ul>
    </nav>
    <?php } ?>
    <div id="map-wrap">
      <?php if(!$isMobile){
      ?>
      <nav id="navigation">
        <ul>
          <li id='navi-position' class='menu-item position'>
            <a href='javascript:void(0)' onclick='window.Trinkbrunnen.Router.getUserLocation()'><span></span>Position</a>
          </li>
          <li id='navi-address' class='menu-item address'>
            <a href='javascript:void(0)' onclick='window.Trinkbrunnen.Router.showAddressSearch()'><span></span>Adresse</a>
          </li>
          <li id='navi-fontain' class='menu-item fontain'>
            <a id='fontain_toggle' href='javascript:void(0)' onclick='window.Trinkbrunnen.Router.nextFountain()'><span></span>Brunnen</a>
          </li>
          <li class='menu-item cluster'>
            <a href='javascript:void(0)' onclick='window.Trinkbrunnen.Router.toggleClusterSingled()'><span></span>Gruppe</a>
          </li>
        </ul>
      </nav>
      <div id="scroll-wrap">
        <a href="javascript:void(0)" onclick='window.Trinkbrunnen.Router.scrollMap()' id="scroll">Karte vergrößern &uarr;</a>
      </div>
      <?php } ?>
      <div id="map_canvas">
        <span id="info_offline">Bitte verbinden Sie sich mit dem Internet und starten Sie die Anwendung neu!</span>
        <span id="reload_map"></span>
      </div>
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
      <div id="failure">
        <div id="failure_message"></div>
        <div id="failure_close_button"></div>
      </div>
      <div id="address">
        <input type='text' name='address' placeholder='Bitte geben Sie eine Adresse ein' class='addressinput'/>
        <input type='button' name='search_address' class='searchsubmit' value='Suche' />
        <div id="search_close_button"></div>
      </div>
    </div>
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
    <?php include "assets/templates/article.html"
    ?>
    <!--models -->
    <script type="text/javascript" src="assets/js/models/feedItem.js"></script>
    <script type="text/javascript" src="assets/js/models/feed.js"></script>
    <script type="text/javascript" src="assets/js/models/map.js"></script>
    <script type="text/javascript" src="assets/js/models/marker.js"></script>
    <script type="text/javascript" src="assets/js/models/userLocation.js"></script>
    <!-- views -->
    <script type="text/javascript" src="assets/js/views/address.js"></script>
    <script type="text/javascript" src="assets/js/views/feed.js"></script>
    <script type="text/javascript" src="assets/js/views/info.js"></script>
    <script type="text/javascript" src="assets/js/views/mapType.js"></script>
    <script type="text/javascript" src="assets/js/views/map.js"></script>
    <!-- collections -->
    <script type="text/javascript" src="assets/js/collections/marker.js"></script>
    <script type="text/javascript" src="assets/js/collections/feedItem.js"></script>
    <!-- router -->
    <script type="text/javascript" src="assets/js/router.js"></script>
    <script type="text/javascript" src="assets/js/main.js"></script>
    <!-- stats -->
    <?php if(!$isMobile){
			include "stats/stats.php";
		}
    ?>
  </body>
</html>