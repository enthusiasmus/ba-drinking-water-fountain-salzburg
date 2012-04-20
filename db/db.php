<?php
	include "config.php";

	$elements = $dtdb->prepare("SELECT * FROM elements");
	$elements->execute();
	
	if(!$elements) die('Failure at database request!');
	
	var_dump($elements);
?>