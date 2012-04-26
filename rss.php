<?php
  header('Content-type: application/xml');
  echo file_get_contents($_GET['feed_url']);
?>