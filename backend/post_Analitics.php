<?php
	function addlogevent($event){
		
		$content = $_POST['content'];
		$atcion = $_POST['action'];
		$event =$action.$event."\n";
		$event=$content.$event."\n";
		file_put_contents("fichier.log", $event."\n", FILE_APPEND);
	}
?>
