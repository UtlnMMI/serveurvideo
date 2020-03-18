<?php
	function addlogevent($event){

		$content=$_POST['content'];
		$action=$_POST['action];

		file_put_contents("fichier.log", $content.",".action.",".$event"\n", FILE_APPEND)
;
		$event=$content.$action.$event."\n";
	}
?>
