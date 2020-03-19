# Package one video file (with 1 video and 1 audio) in MPEG-DASH
#   package <input file> <output dir>
#
pkg='./packager-linux'
cmsdata='../cms.data'
mediaserveur='vps240694.ovh.net'
$pkg \
  in=$1,stream=audio,output=output/$2/audio.mp4 \
  in=$1,stream=video,output=output/$2/video.mp4 \
  --mpd_output output/$2/stream.mpd
ffmpeg -i $1 -vframes 1 -an -filter:v scale="-1:100" -ss 20 output/$2/thumb.jpg
echo $2,http://$mediaserveur/dash/$2/stream.mpd,1,http://$mediaserveur/dash/$2/thumb.jpg,Description_$2 >> $cmsdata


