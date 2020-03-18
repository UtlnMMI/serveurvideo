<?php

// Ajouter log 
function addLog($event) {
    $file = fopen("data.log", "a+") or print_r(error_get_last());
    $txt = "{$_POST['content']},{$_POST['action']},{$event}\n";
    fwrite($file, $txt);
    fclose($file);
}

// Vider fichier de logs
function cleanLog() {
    $file = fopen("data.log", "w") or print_r(error_get_last());
    fclose($file);
}

// addLog('test');
// cleanLog();
