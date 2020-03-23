<?php

$keys = ["videoId", "videoUrl", "flag", "thumb", "desc"];
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
  }
}
echo json_encode(array_values($jsonArr), JSON_UNESCAPED_SLASHES);
