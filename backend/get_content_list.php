<?php

<<<<<<< HEAD
$keys = ["videoId", "videoUrl", "flag"];
$lines = file('cms.data');
$jsonArr = null;
for ($i = 0; $i < count($lines); $i++) {
  $prepJson = explode(", ", $lines[$i]);
  $json = (object) array_combine($keys, $prepJson);
  if (strpos($json->flag, "1") !== false) {
    $json->flag = 1;
    $jsonArr[$i] = $json;
  } else {
    $json->flag = 0;
=======
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
>>>>>>> ba8d16ec7265aa7a133db0b08ce72a8741f8240b
  }
}
echo json_encode(array_values($jsonArr), JSON_UNESCAPED_SLASHES);
