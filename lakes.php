<?php

$config = array(
	"username" => "root",
	"password" => "phpmyadmin",
	"database" => "wasser_land_salzburg",
	"dsn" => "mysql:dbname=wasser_land_salzburg;host=localhost"
);

$adapter = new PDO($config['dsn'], $config['username'], $config['password'], array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")) or die(date('c') . ' Failure database!');
$select = $adapter->query("SELECT * FROM lake_temperatures ORDER BY lake");

if (!$select) {
	die("Failure at database!");
}

$lakes = array();

foreach ($select as $row) {
	$dateGerman = date("H:i d.m.Y", strtotime($row["timestamp"]) + 60 * 60);
	$lake = array(
		"lake" => $row["lake"],
		"city" => $row['city'],
		"timestamp" => $dateGerman,
		"value" => $row["value"] . " °C",
		"latitude" => $row["latitude"],
		"longitude" => $row["longitude"]
	);
	$lakes[] = $lake;
}

echo json_encode($lakes);

?>