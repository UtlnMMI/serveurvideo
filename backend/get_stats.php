<?php
  $fn = fopen("data.log","r");
  $lignes = array();
  $ratio = array();
  
  $brows_pie = false;
  
  if(isset($_GET["browsers"]))
    $brows_pie = true;
    
  $result = fgets($fn);

  while(! feof($fn) )  {

    $videoID = strtok($result,',');
	$action = strtok(',');
	$browser = strtok(',');

    array_push($lignes,$videoID);
    array_push($ratio,$browser);
    
    $result = fgets($fn);
  }

  fclose($fn);
  
  if( $brows_pie === true ) 
  {
      $res = array_count_values($ratio);
      // display   
       
      $label = array_keys($res);
      $data = array_values($res);
       
      printf("[\n");
      if(count($label)>0)
        printf("{\"label\": [");
        
      for ($i=0; $i<count($label); $i++) {
        printf("\"%s\"",$label[$i]);
        if($i!=count($label)-1)
            printf(",");
      }
      if(count($label)>0)
        printf("],\"data\": [");
        
      for ($i=0; $i<count($data); $i++) {
        printf("\"%s\"",$data[$i]);
        if($i!=count($data)-1)
            printf(",");
      }
      if(count($data)>0)
        printf("]}");
      
      printf("]\n");
  }
  else
  {
      $res = array_count_values($lignes);
      // display   

      $label = array_keys($res);
      $data = array_values($res);
       
      printf("[\n");
      if(count($label)>0)
        printf("{\"label\": [");
        
      for ($i=0; $i<count($label); $i++) {
        printf("\"%s\"",$label[$i]);
        if($i!=count($label)-1)
            printf(",");
      }
      if(count($label)>0)
        printf("],\"data\": [");
        
      for ($i=0; $i<count($data); $i++) {
        printf("\"%s\"",$data[$i]);
        if($i!=count($data)-1)
            printf(",");
      }
      if(count($data)>0)
        printf("]}");
      
      printf("]\n");
  }
?>

