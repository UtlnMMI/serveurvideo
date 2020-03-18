<?php
	function addlogevent($event){
		file_put_contents("fichier.log", $event."\n", FILE_APPEND);
		$content = $_POST[''];
		$atcion = $_POST[''];

	}
?>