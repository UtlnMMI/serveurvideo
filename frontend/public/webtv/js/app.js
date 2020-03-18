function initApp() {
  // Install built-in polyfills to patch browser incompatibilities.
  shaka.polyfill.installAll();

  // Check to see if the browser supports the basic APIs Shaka needs.
  if (shaka.Player.isBrowserSupported()) {
    // Everything looks good!
    initPlayer();
  } else {
    // This browser does not have the minimum set of APIs we need.
    console.error('Browser not supported!');
  }
}

function initPlayer(manifestUri) {
  // Create a Player instance.
  var video = document.getElementById('video');
  var player = new shaka.Player(video);

  // Attach player to the window to make it easy to access in the JS console.
  window.player = player;

  // Listen for error events.
  player.addEventListener('error', onErrorEvent);

  // Try to load a manifest.
  // This is an asynchronous process.
  player.load(manifestUri).then(function() {
    // This runs if the asynchronous load is successful.
    console.log('The video has now been loaded!');
  }).catch(onError);  // onError is executed if the asynchronous load fails.
}

function onErrorEvent(event) {
  // Extract the shaka.util.Error object from the event.
  onError(event.detail);
}

function onError(error) {
  // Log the error.
  console.error('Error code', error.code, 'object', error);
}


// Event chargement liens dynamiques VODs
window.addEventListener('load', () => {
    requete()
}, false)


// Création des liens des VODs
const linkCreator = (resp, parent) => {
    resp.forEach(el => {
        parent.insertAdjacentHTML('afterbegin', `<li><a href="${el.videoUrl}" class="has-text-primary">${el.videoId}</a></li>`)
    })
    parent.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault()
            console.log(e.target.href)
            initPlayer("http://localhost/media/test/sintel.mpd")
        })
    })
}

// Requete XHR
function requete() {
    let linkMpd = document.querySelector('.section.linkVOD .container ul')
    xhr = new XMLHttpRequest()
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.readyState === 4) {
            let response = JSON.parse(xhr.responseText)
            linkCreator(response, linkMpd)
        }
    })
    xhr.open('GET', 'http://localhost/get_content_list.php')
    xhr.send(null)
}

// Chargement du manifeste
function loadManifest(mpd = "http://localhost/media/test/sintel.mpd") {
    let video,
        player,
        url = mpd;

    video = document.querySelector(".videoDashJs");
     video.innerHTML = ''

     player = dashjs.MediaPlayer().create();
     player.initialize(video, url, true);

}
