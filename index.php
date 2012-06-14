<?php
  $isIphone = strstr($_SERVER['HTTP_USER_AGENT'],'iPhone');
  $isIpod = strstr($_SERVER['HTTP_USER_AGENT'],'iPod');
  $isIpad = strstr($_SERVER['HTTP_USER_AGENT'],'iPad');
  $isAndroid = strstr($_SERVER['HTTP_USER_AGENT'],'Android');
?>

<!DOCTYPE html>
<html>
  <head>
    <meta content="text/html;charset=UTF-8" http-equiv="content-type">    
    
    <!-- iphone commands -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />                  <!-- hiding safari user interface components -->
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />     <!-- changing status bar appearance, only with command above! -->
    <link rel="apple-touch-icon" href="assets/img/icon-apple.png"/>             <!-- default icon image for the homescreen -->
    <link rel="apple-touch-startup-image" href="assets/img/startup.png" />      <!-- quick startup screen -->
    
    <?php
      if ( $isAndroid || $isIpad || $isIphone || $isIpod )
        echo "<title>TrinkWasser!</title>";
      else
        echo "<title>TrinkWasser! Land Salzburg</title>";
    ?>
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    
    <link rel="stylesheet" type="text/css" media="screen" href="assets/css/reset.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="assets/css/style.css" />

  </head>
  <body>

    <div id="loading"></div>

    <div id="wrap">

      <header id="header">
        <!-- <hgroup>
          <h1 id="logo_trinkwasser"><a href="">TrinkWasser! Land Salzburg</a></h1>
          <h2 id="logo_wasser">Wasser Land Salzburg</h2>
        </hgroup> -->
        <nav id="header-navigation">
          <ul>
            <li class='menu-item feed'><a href='#feed'>News</a></li>
            <li class='menu-item about'><a href='#about'>Impressum</a></li>
          </ul>
        </nav>   
      </header>

      <!-- <div class="flexslider">
        <ul class="slides">
          <li><img src="assets/img/water_1.png"/></li>
          <li><img src="assets/img/water_2.png"/></li>
          <li><img src="assets/img/water_3.png"/></li>
          <li><img src="assets/img/water_4.png"/></li>
        </ul>
      </div> --> 

      <!-- <div id="appinfo">
        <span id="hand-phone"></span>

        <h3 id="slogan">
          <span>App mit über 160 Trinkbrunnen</span><br>
          <span>im ganzen Land Salzburg</span>
        </h3>

        <a href="http://itunes.apple.com/at/genre/ios/id36?mt=8" id="appstore">Availiable on the App Store</a>
        <a href="https://play.google.com/store?hl=de" id="googleplay">Google play</a>
      </div> -->

      <div id="info"></div>
      <div id="feed"></div>

    </div>

    <div id="map-wrap">
      <!-- <a href="javascript:void(0)" onclick='window.Trinkbrunnen.scrollMap()' id="scroll">Probier es aus &uarr;</a> -->
      <nav id="navigation">
        <ul>
          <li class='menu-item position'><a href='javascript:void(0)' onclick='window.Trinkbrunnen.getUserLocation()'><span></span>Position</a></li>
          <li class='menu-item address'><a href='javascript:void(0)' onclick='window.Trinkbrunnen.showAddressSearch()'><span></span>Adresse</a></li>
          <li class='menu-item fontain'><a href='javascript:void(0)' onclick='window.Trinkbrunnen.nextFountain()'><span></span>Brunnen</a></li>
          <li class='menu-item maptype'><a href='javascript:void(0)' onclick='window.Trinkbrunnen.showMaptype()'><span></span>Kartentyp</a></li>
        </ul>
      </nav>
      <div id="map_canvas"></div>
      <div id="maptype"></div>
      <div id="address"></div>
    </div>
    <!-- <a href="javascript:void(0)" onclick='window.Trinkbrunnen.scrollMap()' id="activatemap"></a> -->





    <script type="text/javascript" src="https://maps.google.com/maps/api/js?libraries=geometry&sensor=true"></script>

    <!-- libs -->
    <script type="text/javascript" src="assets/js/libs/markerclusterer.js"></script>
    <script type="text/javascript" src="assets/js/libs/infobox.js"></script>
    <script type="text/javascript" src="assets/js/libs/jquery.js"></script>
    <script type="text/javascript" src="assets/js/libs/jquery.dateFormat.js"></script>
    <script type="text/javascript" src="assets/js/libs/spin.js"></script>
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
    <script type="text/javascript" src="assets/js/views/loading.js"></script>
    <script type="text/javascript" src="assets/js/views/mapType.js"></script>
    <script type="text/javascript" src="assets/js/views/map.js"></script>

    <!-- collections -->
    <script type="text/javascript" src="assets/js/collections/marker.js"></script>
    <script type="text/javascript" src="assets/js/collections/feedItem.js"></script>

    <!-- router -->
    <script type="text/javascript" src="assets/js/router.js"></script>
    
    <?php include("assets/templates/main.html"); ?>

    <script type="text/javascript" src="assets/js/main.js"></script>

  </body>
</html>