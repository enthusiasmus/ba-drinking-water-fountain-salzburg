<?php
if (preg_match('/(alcatel|android|blackberry|benq|cell|elaine|htc|iemobile|iphone|ipad|ipaq|ipod|j2me|java|midp|mini|mobi|motorola|nokia|palm|panasonic|philips|phone|sagem|sharp|smartphone|sony|symbian|t-mobile|up\.browser|up\.link|vodafone|wap|wireless|xda|zte)/i', $_SERVER['HTTP_USER_AGENT']) && !strstr($_SERVER['HTTP_USER_AGENT'], 'iPad'))
  $isMobile = true;
else
  $isMobile = false;
?>

<!DOCTYPE html>
<?php
if ($isMobile)
  echo "<html manifest='cache.manifest'>";
else
  echo "<html>";
?>
<head>
  <meta content="text/html;charset=UTF-8" http-equiv="content-type">
  <!-- iphone commands -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <!-- hiding safari user interface components -->
  <meta name="apple-mobile-web-app-status-bar-style" content="default" />
  <!-- changing status bar appearance, only with command above! -->
  <link rel="apple-touch-icon" href="assets/img/icon-apple.png"/>
  <!-- default icon image for the homescreen -->
  <link rel="apple-touch-startup-image" href="assets/img/startup.png" />
  <!-- quick startup screen -->
  <?php
  if ($isMobile)
    echo "<title>AquaSalzburg</title>";
  else
    echo "<title>AquaSalzburg - DIE Trinkbrunnen-App für das Land Salzburg</title>";
  ?>
  <meta name="description" content="" />
  <meta name="keywords" content="" />
  <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
  <link rel="stylesheet" type="text/css" media="screen" href="assets/css/reset.css" />
  <link rel="stylesheet" type="text/css" media="screen" href="assets/css/style.css" />
  <link rel="stylesheet" type="text/css" media="screen" href="assets/css/nivo-slider.css" />
</head>
<body>
  <div id="loading"></div>
  <?php if ( !$isMobile ) {
  ?>
  <div id="wrap">
    <div id="slider" class="nivoSlider">
      <img src="assets/img/slider/01.jpg" class="slide" alt="" />
      <img src="assets/img/slider/02.jpg" class="slide" alt="" />
      <img src="assets/img/slider/03.jpg" class="slide" alt="" />
      <img src="assets/img/slider/04.jpg" class="slide" alt="" />
    </div>
    <div id="inner-wrap">
      <?php }?>

      <header id="header">
        <?php if ( !$isMobile ) {
        ?>
        <hgroup>
          <h1 id="logo_aqua"><a href="">Aqua Salzburg</a></h1>
          <h2 id="logo_salzburg">Land Salzburg</h2>
        </hgroup>
        <?php }?>
        <nav id="header-navigation">
          <ul>
            <li class='menu-item feed'>
              <a href='#feed'>News</a>
            </li>
            <li class='menu-item about'>
              <a href='#about'>Impressum</a>
            </li>
          </ul>
        </nav>
      </header>
      <div id="info">
        <div>
          <h2>Aqua Salzburg</h2>
          <p>
            entwickelt in Zusammenarbeit mit:
            <br>
            <b>MultiMediaTechnology</b> &amp; <b>MultiMediaArt</b>
            <br>
            Studiengänge der Fachhochschule Salzburg
          </p>
          <p><img src="assets/img/logo-fh-salzburg.png" width="200" height="55" alt="FH Salzburg" />
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
        <?php if ( !$isMobile ) {
        ?><a href="javascript:void(0)" onclick="window.Trinkbrunnen.slideArticleToLeft()" class="prev">Neuere Wasser-News</a><?php }?>
        <section id="rss"></section>
        <?php if ( !$isMobile ) {
        ?><a href="javascript:void(0)" onclick="window.Trinkbrunnen.slideArticleToRight()" class="next">Ältere Wasser-News</a><?php }?>
      </div>
      <?php if ( !$isMobile ) {
      ?>
      <div id="appinfo">
        <h3 id="slogan"><span>App mit über 160 Trinkbrunnen</span>
        <br>
        <span>im ganzen Land Salzburg</span></h3>
        <a href="http://itunes.apple.com/at/genre/ios/id36?mt=8" id="appstore">Availiable on the App Store</a>
        <a href="https://play.google.com/store?hl=de" id="googleplay">Google play</a>
      </div>
    </div>
    <span id="hand-phone"></span>
  </div>
  <?php }?>

  <div id="map-wrap">
    <div id="scroll-wrap">
      <a href="javascript:void(0)" onclick='window.Trinkbrunnen.scrollMap()' id="scroll">Probier es aus &uarr;</a>
    </div>
    <nav id="navigation">
      <ul>
        <li class='menu-item position'>
          <a href='javascript:void(0)' onclick='window.Trinkbrunnen.getUserLocation()'><span></span>Position</a>
        </li>
        <li class='menu-item address'>
          <a href='javascript:void(0)' onclick='window.Trinkbrunnen.showAddressSearch()'><span></span>Adresse</a>
        </li>
        <li class='menu-item fontain'>
          <a href='javascript:void(0)' onclick='window.Trinkbrunnen.nextFountain()'><span></span>Brunnen</a>
        </li>
        <li class='menu-item maptype'>
          <a href='javascript:void(0)' onclick='window.Trinkbrunnen.showMaptype()'><span></span>Kartentyp</a>
        </li>
      </ul>
    </nav>
    <div id="map_canvas"></div>
    <div id="map_pointer"></div>
    <div id="map_pointer_text"></div>
    <div id="maptype"></div>
    <div id="address">
      <input type='text' name='address' placeholder='Bitte geben Sie eine Adresse ein' class='addressinput' />
      <input type='button' name='search_address' class='searchsubmit' />
    </div>
  </div>
  <a href="javascript:void(0)" onclick='window.Trinkbrunnen.scrollMap()' id="activatemap"></a>
  <script type="text/javascript" src="https://maps.google.com/maps/api/js?libraries=geometry&sensor=true&region=AT"></script>
  <!-- libs -->
  <script type="text/javascript" src="assets/js/libs/markerclusterer.js"></script>
  <script type="text/javascript" src="assets/js/libs/infobox.js"></script>
  <script type="text/javascript" src="assets/js/libs/jquery.js"></script>
  <script type="text/javascript" src="assets/js/libs/jquery.dateFormat.js"></script>
  <script type="text/javascript" src="assets/js/libs/jquery.nivo.slider.js"></script>
  <script type="text/javascript" src="assets/js/libs/spin.js"></script>
  <script type="text/javascript" src="assets/js/libs/underscore.js"></script>
  <script type="text/javascript" src="assets/js/libs/backbone.js"></script>
  <script type="text/javascript">
    $(window).load(function() {
      // initialize image slider
      $('#slider').nivoSlider({
        effect : 'fade',
        animSpeed : 800,
        pauseTime : 5000,
        directionNav : false,
        controlNav : false,
        pauseOnHover : false
      });
    });
  </script>
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
  <script type="text/javascript" src="assets/js/views/loading.js"></script>
  <script type="text/javascript" src="assets/js/views/mapType.js"></script>
  <script type="text/javascript" src="assets/js/views/map.js"></script>
  <!-- collections -->
  <script type="text/javascript" src="assets/js/collections/marker.js"></script>
  <script type="text/javascript" src="assets/js/collections/feedItem.js"></script>
  <!-- router -->
  <script type="text/javascript" src="assets/js/router.js"></script>
  <?php
    include ("assets/templates/main.html");
  ?>
  <script type="text/javascript" src="assets/js/main.js"></script>
</body>
</html>