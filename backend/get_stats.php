<?php
  $fn = fopen("fichier.log","r");
  $labels = array();
  $data = array();  
  $result = fgets($fn);

  while(! feof($fn) )  {

    $videoID = strtok($result,',');
	$action = strtok(',');
	$browser = strtok(',');

    $el = array_search($videoID, $labels);

    if( $el != FALSE) {
		$data[$el] = $data[$el]+1;
		}
    else
    {
        array_push($labels,$videoID);
        array_push($data,1);
    }
    $result = fgets($fn);
  }

  fclose($fn);
  
  // display
  printf("[\n");
  if(count($labels)>0)
    printf("{\"label\": [");
    
  for ($i=0; $i<count($labels); $i++) {
    printf("\"%s\"",$labels[$i]);
    if($i!=count($labels)-1)
        printf(",");
  }
  if(count($labels)>0)
    printf("],\"data\": [");
    
  for ($i=0; $i<count($data); $i++) {
    printf("\"%s\"",$data[$i]);
    if($i!=count($data)-1)
        printf(",");
  }
  if(count($data)>0)
    printf("}");
  
  printf("]\n");
?>

