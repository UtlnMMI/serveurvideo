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
    initApp()
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
            // ! Paramètre à changer par 'e.target.href' quand cms.data aura manifeste valide
            initPlayer('https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd')
        })
    })
}

// Requete XHR
function requete() {
    let linkMpd = document.querySelector('.linkVOD ul')
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

function loadManifest(mpd = "http://localhost:8080/BentoDash/test_1/stream.mpd") {

    let video,
        player,
        url = mpd

    video = document.querySelector(".videoDashJs")
    // video.innerHTML = ''
    video.dashjs.attachSource(url)
    // video.src = mpd
}

// Initialisation du Shaka Player
function initApp() {
    shaka.polyfill.installAll()

    if (shaka.Player.isBrowserSupported()) {
        initPlayer()
    } else {
        console.error('Browser not supported!')
    }
}

// Initialisation des paramètres du Player
function initPlayer(mpd = "http://localhost:8080/BentoDash/test_1/stream.mpd") {
    let prt = document.querySelector('.shakaPlayer-container')
    
    prt.innerHTML = ""    

    if (~prt.hasChildNodes()) {
        prt.insertAdjacentHTML('beforeend', '<video id="video" controls=true></video>')
    }
    let video = document.getElementById('video')
    var player = new shaka.Player(video)

    window.player = player

    player.addEventListener('error', onErrorEvent)

    player.load(mpd).then(function () {
        console.log('The video has now been loaded!')
    }).catch(onError)
}

// Code d'erreur
function onErrorEvent(event) {
    onError(event.detail)
}

// Code d'erreur
function onError(error) {
    console.error('Error code', error.code, 'object', error)
}

// document.addEventListener('DOMContentLoaded', )

