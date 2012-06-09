<?php
  $isIphone = strstr($_SERVER['HTTP_USER_AGENT'],'iPhone');
  $iPod = strstr($_SERVER['HTTP_USER_AGENT'],'iPod');
  $iPad = strstr($_SERVER['HTTP_USER_AGENT'],'iPad');
  $android = strstr($_SERVER['HTTP_USER_AGENT'],'Android');
  
  //include different stylesheets when if($iPad == 'iPad') etc.
?>

<!DOCTYPE html>
<html>
	<head>
		<meta content="text/html;charset=UTF-8" http-equiv="content-type">		
		
		<!-- iphone commands -->
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		<meta name="apple-mobile-web-app-capable" content="yes" /> 												<!-- hiding safari user interface components -->
		<meta name="apple-mobile-web-app-status-bar-style" content="default" />	<!-- changing status bar appearance, only with command above! -->
		<link rel="apple-touch-icon" href="assets/img/apple-icon.png"/>										<!-- default icon image for the homescreen -->
		<link rel="apple-touch-startup-image" href="assets/img/apple-startup.png" />  		<!-- quick startup screen -->
		
		<title>Trinkbrunnen - Salzburger Land</title>
		<link rel="stylesheet" href="assets/css/style.css" />
	</head>
	<body>