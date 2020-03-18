# Package one video file (with 1 video and 1 audio) in MPEG-DASH
#   bento-dash <input file> <output dir>
#
BentoDir='/usr/local/Bento4'
cmsdata='../cms/data'
mediaserveur='localhost:8080'
$BentoDir/bin/mp4fragment --track video $1 frag_video.mp4
$BentoDir/bin/mp4fragment --track audio $1 frag_audio.mp4
$BentoDir/bin/mp4dash --profiles='urn:mpeg:dash:profile:isoff-on-demand:2011' -o output/$2/ frag_video.mp4 frag_audio.mp4
echo $2,http://$mediaserveur/content/$2/stream.mpd,1,http://$mediaserveur/content/$2/thumb.jpg,Description_$2 >> $cmsdata


