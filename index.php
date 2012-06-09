<?php
  include("header.php");
?>

<div id="loading"></div>
<nav id="navigation">
  <ul>
    <li class='menu-item'><a href='javascript:void(0)' onclick='window.Trinkbrunnen.getUserLocation()'>Position</a></li>
    <li class='menu-item'><a href='javascript:void(0)' onclick='window.Trinkbrunnen.showAddressSearch()'>Adresse</a></li>
    <li class='menu-item'><a href='javascript:void(0)' onclick='window.Trinkbrunnen.nextFountain()'>Brunnen</a></li>
    <li class='menu-item'><a href='javascript:void(0)' onclick='window.Trinkbrunnen.showMaptype()'>Kartentyp</a></li>
    <li class='menu-item'><a href='#feed'>News</a></li>
    <li class='menu-item'><a href='#about'>Info</a></li>
  </ul>
</nav>
<div id="map_canvas"></div>
<div id="maptype"></div>
<div id="address"></div>
<div id="info"></div>
<div id="feed"></div>

<?php
  include("footer.php");
?>