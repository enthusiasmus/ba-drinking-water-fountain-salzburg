<?php
	include "config.php";
	
  $db = new PDO($DSN, $DB_USER, $DB_PASS)
  	or die('Can access $DBO database!');

	$elements_query = $db->prepare('SELECT * FROM elements');
	$elements_query->execute();
	$elements = $elements_query->fetchAll();
	
	if(!$elements) die('Failure at database request!');
	
	/* TODO: JSON-Building */
?>