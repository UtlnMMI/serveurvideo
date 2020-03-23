// Numero du port
const host = "localhost:8080"

// Event chargement liens dynamiques VODs
window.addEventListener('load', () => {
    initApp()
    requete()
}, false)


// Création des liens des VODs
const linkCreator = (resp, parent) => {
    resp.forEach(el => {
        parent.insertAdjacentHTML('afterbegin', `<li><a id="${el.videoId}" href="${el.videoUrl}" class="has-text-primary">${el.videoId}</a></li>`)
    })
    parent.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault()
            console.log(e.target.href)
            // ! Paramètre à changer par 'e.target.href' quand cms.data aura manifeste valide
            initPlayer(e.target.id, e.target.href)
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
    xhr.open('GET', `http://${host}/backend/get_content_list.php`)
    xhr.send(null)
}

// Push analytics
function post_analytics(videoid) {
    xhr = new XMLHttpRequest()
    xhr.open('POST', `http://${host}/backend/analytics.php`)
    xhr.send("content=" + videoid + "&action=play");
}

// Chargement du manifeste
function loadManifest(mpd = `http://${host}/dash/test_1/stream.mpd`) {
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
function initPlayer(vid =`video`, mpd = `http://${host}/dash/test_1/stream.mpd`) {
    let prt = document.querySelector('.shakaPlayer-container')
    
    prt.innerHTML = ""    

    if (~prt.hasChildNodes()) {
        prt.insertAdjacentHTML('beforeend', '<video id="video" controls=true></video>')
    }
    let video = document.getElementById('video')
    var player = new shaka.Player(video)

    window.player = player

    player.addEventListener('error', onErrorEvent)
    
    post_analytics(vid)
    
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
