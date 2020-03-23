<?php
  $fn = fopen("cms.data","r");

  printf("[\n");
  $debut = 1;
  $result = fgets($fn);

  while(! feof($fn) )  {

    $videoID = strtok($result,',');
	$videoUrl = strtok(',');
	$flag = strtok(',');
    $thumb = strtok(',');
	$desc = strtok(',');    
    if( $debut != 1 && $flag == 1)
		printf(",");
	if( $flag == 1 )
		printf(" { \"videoId\": \"%s\", \"videoUrl\": \"%s\", \"thumb\": \"%s\", \"desc\": \"%s\"}", $videoID, $videoUrl, $thumb, $desc);

	$debut = 0;
	$result = fgets($fn);
  }

  fclose($fn);
  printf("]\n");
?>
