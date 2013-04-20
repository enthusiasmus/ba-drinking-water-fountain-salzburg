<?php

$dnrs = array(
	"Obertrumer See" => "00203612_2",
	"Mattsee" => "00203604_2",
	"Fuschlsee" => "00203653_2",
	"Grabensee" => "00204131_2",
	"Wallersee" => "00203588_2",
	"Wolfgangsee" => "00203646_2",
	"Zeller See" => "00203117_3",
);

$config = array(
	"username" => "root",
	"password" => "phpmyadmin",
	"database" => "wasser_land_salzburg",
	"dsn" => "mysql:dbname=wasser_land_salzburg;host=localhost"
);

//array as key => value
foreach ($dnrs as $lake => $dnr) {
	$dateTimeEarlier = new DateTime('NOW');
	$dateTimeEarlier->sub(new DateInterval('PT750S'));
	$dateEarlier = $dateTimeEarlier->format('Y-m-d');
	$timeEarlier = $dateTimeEarlier->format('H:i:s');

	$parameters = array(
		//access the static dnrs array by for-each-value
		'pDANR' => $dnr,
		//datetime soap format --> CCYY-MM-DDThh:mm:ss
		'pZEITRAUM_VON' => $dateEarlier . "T" . $timeEarlier,
		'pZEITRAUM_BIS' => date('c')
	);

	try {
		$client = new SoapClient("http://service.salzburg.gv.at/wisonline/webservices/wswiski.asmx?WSDL");
		$resultLakes = $client->getWISKI_MESSWERTE($parameters)->getWISKI_MESSWERTEResult->cWS_WISKI_MESSWERTE;
	}
	catch (SoapFault $fault) {
		trigger_error("SOAP-Fehler: (Fehlernummer: {$fault->faultcode}, " . "Fehlermeldung: {$fault->faultstring})", E_USER_ERROR);
	}

	$latestValues = array(
		'lake' => $lake,
		'timestamp' => '',
		'value' => ''
	);

	//array as key => value
	foreach ($resultLakes as $key => $values) {
		if (floatval($values->VALUE_FL) > (-40) && floatval($values->VALUE_FL) < 40) {
			$latestValues['timestamp'] = $values->TIMESTAMP_TS;
			$latestValues['value'] = $values->VALUE_FL;
		}
	}

	$adapter = new PDO($config['dsn'], $config['username'], $config['password'], array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8")) or die(date('c') . ' Failure database!');
	$update = $adapter->prepare("UPDATE lake_temperatures SET timestamp = CAST(:timestamp AS datetime), value = :value WHERE lake = :lake");
	$isUpdated = $update->execute(array(
		':timestamp' => strip_tags($latestValues['timestamp']),
		':value' => strip_tags($latestValues['value']),
		':lake' => strip_tags($latestValues['lake'])
	));

	if(!$isUpdated){
		die("Failure at database!");
	}
}
?>