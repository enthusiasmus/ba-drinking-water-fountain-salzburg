<?php

$area = $_GET['area'];
$file = "";

if ($area == "north") {
	$file = "http://www.salzburg.gv.at/2043wiskiweb/APP_KiBasicGrafikenAPP_Vorlandseen.png";
}
else if ($area == "south") {
	$file = "http://www.salzburg.gv.at/2043wiskiweb/APP_KiBasicGrafikenAPP_Berglandseen.png";
}
else {
	die("no allowed area");
}

header('Content-Description: File Transfer');
header("Content-type: application/octet-stream");
header("Content-disposition: attachment; filename= " . $file . "");
readfile($file);

?>