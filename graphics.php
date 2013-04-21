<?php

$area = $_GET['area'];
$file = "";

if ($area == "north") {
	$file = "http://www.salzburg.gv.at/2043wiskiweb/APP_See_WT_Vorlandseen_KiBasicGrafikenWTVorlandsee.png";
}
else if ($area == "south") {
	$file = "http://www.salzburg.gv.at/2043wiskiweb/APP_See_WT_Berglandseen_KiBasicGrafikenWTBerglandseen.png";
}
else {
	die("no allowed area");
}

header('Content-Description: File Transfer');
header("Content-type: application/octet-stream");
header("Content-disposition: attachment; filename= " . $file . "");
readfile($file);

?>