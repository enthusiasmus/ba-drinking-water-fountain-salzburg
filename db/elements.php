<?php
	include "config.php";
	
  $db = new PDO($DSN, $DB_USER, $DB_PASS, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"))
  	or die('Can\'t access $DBO database!');

	$elements_query = $db->prepare('SELECT * FROM elements');
	$elements_query->execute();
	
	if(!$elements_query) die('Failure at database request!');

	$elements_json = $elements_query->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($elements_json);
?>