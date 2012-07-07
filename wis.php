<?php
  $soapClient = new SoapClient('http://service.salzburg.gv.at/wisonline/WebServices/wsexternal.asmx?WSDL');
  $soapFountains = $soapClient->getTRINKWASSERBRUNNEN()->getTRINKWASSERBRUNNENResult->cWS_TRINKWASSERBRUNNEN;

  $jsonFountains = json_encode($soapFountains);
  echo $jsonFountains;
?>