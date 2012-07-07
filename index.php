<?php
  $isMobile = false;
  $ios = false;
  $android = false;

  if ( preg_match('/(alcatel|android|blackberry|benq|cell|elaine|htc|iemobile|iphone|ipad|ipaq|ipod|j2me|java|midp|mini|mobi|motorola|nokia|palm|panasonic|philips|phone|sagem|sharp|smartphone|sony|symbian|t-mobile|up\.browser|up\.link|vodafone|wap|wireless|xda|zte)/i', $_SERVER['HTTP_USER_AGENT']) )
    $isMobile = true;

  if ( strstr($_SERVER['HTTP_USER_AGENT'], 'iPad') || strstr($_SERVER['HTTP_USER_AGENT'], 'iPhone') || strstr($_SERVER['HTTP_USER_AGENT'], 'iPod') )
    $ios = true;

  if ( strstr($_SERVER['HTTP_USER_AGENT'], 'Android') )
    $android = true;
?>
<!DOCTYPE html>
<html>
<head>
  <meta content="text/html;charset=UTF-8" http-equiv="content-type">
  <?php if ($isMobile) { ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />    
    <link rel="apple-touch-icon-precomposed" href="assets/img/mobile/icon.png"/>
    <title>Wasser</title>
    <?php if($ios) { ?>
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <link rel="apple-touch-startup-image" href="assets/img/ios/startup-iphone.png" />
    <?php } ?>
  <?php } else { ?>
    <title>Wasser Land Salzburg</title>
    <link rel='icon' href='assets/img/website/favicon.png' type='image/png'>
  <?php } ?>
  <meta name="description" content="" />
  <meta name="keywords" content="" />
  <link rel="stylesheet" type="text/css" media="screen" href="assets/css/reset.css" />
  <link rel="stylesheet" type="text/css" media="screen" href="assets/css/style.css" />
<?php if ($ios) { ?>
  <link rel="stylesheet" type="text/css" media="screen" href="assets/css/ios.css" />
<?php } else if ( $android ) { ?>
  <link rel="stylesheet" type="text/css" media="screen" href="assets/css/android.css" />
<?php } else if ( $isMobile ) { ?>
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
  <?php if ( !$isMobile ) { ?>
  <div id="wrap">
    <div id="slider" class="nivoSlider">
      <img src="assets/img/slider/06.jpg" class="slide" alt="" />
      <img src="assets/img/slider/01.jpg" class="slide" alt="" />
      <img src="assets/img/slider/02.jpg" class="slide" alt="" />
      <img src="assets/img/slider/03.jpg" class="slide" alt="" />
      <img src="assets/img/slider/04.jpg" class="slide" alt="" />
      <img src="assets/img/slider/05.jpg" class="slide" alt="" /> 
    </div>
    <div id="inner-wrap">
  <?php } ?>
      <header id="header">
        <?php if ( !$isMobile ) { ?>
        <hgroup>
          <h1 id="logo"><a href="#">Wasser Land Salzburg</a></h1>
          <h2 id="logo_salzburg"><a href="http://www.salzburg.gv.at/wasser" target="_blank">Land Salzburg</a></h2>
        </hgroup>
        <?php } else { ?>
          <h1 id="logo">Land Salzburg</h1>
          <a href="javascript:void(0)" onclick='window.Trinkbrunnen.index()' id="back">Zurück</a>
        <?php } ?>
        <nav id="header-navigation">
          <ul>
            <?php if ( !$isMobile ) { ?>
            <li class='menu-item show_map'>
              <a href='javascript:void(0)' onclick='window.Trinkbrunnen.scrollMap()'>Karte</a>
            </li>
            <li class='menu-item feed'>
              <a href='javascript:void(0)' onclick='window.Trinkbrunnen.showRssFeed()'>Wasser-News</a>
            </li>
            <?php } ?>
            <li class='menu-item lake'>
              <a href='http://www.salzburg.at/sbg_aktuell.html?AktuellID=WT' target='_blank'>Seentemperaturen</a>
            </li>
            <li class='menu-item about'>
              <a href='javascript:void(0)' onclick='window.Trinkbrunnen.showAbout()'>Impressum</a>
            </li>
          </ul>
        </nav>
      </header>
      <div id='overlay'></div>
      <div id="info">
        <div id="info-content">
          <h2>Wasser Land Salzburg</h2>
          <p>
            entwickelt in Zusammenarbeit mit:
            <br>
            <b>MultiMediaTechnology</b> &amp; <b>MultiMediaArt</b>
            <br>
            Studiengänge der Fachhochschule Salzburg
          </p>
          <p>
            <div id="fh-logo"></div>
          </p>
          <p>
            <i>Programmierung:</i> Lukas Wanko, Nicole Buchegger, Robert Koch
            <br/>
            <i>Design:</i> Karin Schnirch, Philipp Fauser
          </p>
          <h4>Disclaimer – Haftungsausschlusserklärung</h4>
          <p>
            Diese Website dient zu Ihrer Information. Sie wird mit Sorgfalt bearbeitet. Sowohl für die Auswahl der einzelnen Verweise wie für die Beiträge in den Sparten kann für Vollständigkeit, Auswahl und inhaltliche Richtigkeit der Informationen keine Haftung übernommen werden. Der Betreiber kann für fremde Inhalte, die durch die angebotene Datenbank erreichbar sind (Links), keine Haftung übernehmen.
          </p>
          <p>
            Die Website kann insbesondere die persönliche Beratung im konkreten Einzelfall nicht ersetzten. Durch die zur Verfügung gestellten Informationen wird kein wie immer geartetes Rechtsverhältnis zwischen dem Land Salzburg und dem Nutzer begründet.
          </p>
          <p>
            Die auf der Website des Landes Salzburg veröffentlichten Beiträge sind urheberrechtlich geschützt. Jede unberechtigte Vervielfältigung und/oder Verbreitung dieser Seiten stellt eine Verletzung des österreichischen Urheberrechtsgesetzes dar.
          </p>
          <p>
            Dieser Haftungsausschluss ist als Teil des Internetangebotes zu betrachten, von dem aus auf diese Seite verwiesen wurde.
          </p>
        </div>
      </div>
      <div id="feed">
        <?php if ( !$isMobile ) { ?>
        <a href="javascript:void(0)" id="prev" class="prev">Neuere Wasser-News</a>
        <div id="rss_content">
        <?php } ?>       
        <section id="rss"></section>
        <?php if ( !$isMobile ) { ?>
        </div>
        <a href="javascript:void(0)" id="next" class="next">Ältere Wasser-News</a>
        <?php } ?>
      </div>
  <?php if ( !$isMobile ) { ?>
      <div id="appinfo">
        <h3 id="slogan"><span>App mit über 180 Trinkbrunnen</span>
        <br>
        <span>im ganzen Land Salzburg</span></h3>
        <a href="http://itunes.apple.com/at/genre/ios/id36?mt=8" id="appstore">Availiable on the App Store</a>
        <a href="https://play.google.com/store?hl=de" id="googleplay">Google play</a>
        <br>
        <div id="latest_feed"></div>
      </div>
      <span id="hand-phone"></span>
    </div>
  </div>
  <?php } ?>
  <div id="map-wrap">
    <?php if ( !$isMobile ) { ?>
    <div id="scroll-wrap">
      <a href="javascript:void(0)" onclick='window.Trinkbrunnen.scrollMap()' id="scroll">Karte vergrößern &uarr;</a>
    </div>
    <?php } ?>
    <nav id="navigation">
      <ul>
        <li class='menu-item position'>
          <a href='javascript:void(0)' onclick='window.Trinkbrunnen.getUserLocation()'><span></span>Position</a>
        </li>
        <li class='menu-item address'>
          <a href='javascript:void(0)' onclick='window.Trinkbrunnen.showAddressSearch()'><span></span>Adresse</a>
        </li>
        <li class='menu-item fontain'>
          <a id='fontain_toggle' href='javascript:void(0)' onclick='window.Trinkbrunnen.nextFountain()'><span></span>Brunnen</a>
        </li>
        <?php if(!$isMobile){ ?>
        <li class='menu-item cluster'>
          <a href='javascript:void(0)' onclick='window.Trinkbrunnen.toggleClusterSingled()'><span></span>Gruppe</a>
        </li>
        <?php } else { ?>
        <li class='menu-item maptype'>
          <a href='javascript:void(0)' onclick='window.Trinkbrunnen.showMaptype()'><span></span>Kartentyp</a>
        </li>
        <li class='menu-item feed'>
          <a href='#feed'><span></span>News</a>
        </li>
        <?php } ?>
      </ul>
    </nav>
    <div id="map_canvas"></div>
    <div id="maptype">
      <div>
        <ul>
          <li class='menu-item'><a href='#maptype/roadmap'>Straße</a></li>
          <li class='menu-item'><a href='#maptype/satellite'>Satellit</a></li>
          <li class='menu-item'><a href='#maptype/hybrid'>Hybrid</a></li>
          <li class='menu-item'><a href='#maptype/terrain'>Terrain</a></li>
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
  <a href="javascript:void(0)" onclick='window.Trinkbrunnen.scrollMap()' id="activatemap"></a>
  <script type="text/javascript" src="https://maps.google.com/maps/api/js?libraries=geometry&amp;sensor=true&amp;region=AT"></script>
  <!-- libs -->
  <script type="text/javascript" src="assets/js/libs/markerclusterer.js"></script>
  <script type="text/javascript" src="assets/js/libs/infobox.js"></script>
  <script type="text/javascript" src="assets/js/libs/jquery.js"></script>
  <script type="text/javascript" src="assets/js/libs/jquery.dateFormat.js"></script>
  <script type="text/javascript" src="assets/js/libs/jquery.nivo.slider.js"></script>
  <script type="text/javascript" src="assets/js/libs/underscore.js"></script>
  <script type="text/javascript" src="assets/js/libs/backbone.js"></script>
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
</body>
</html>