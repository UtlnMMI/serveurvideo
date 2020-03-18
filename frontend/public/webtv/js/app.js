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
            loadManifest()
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
    xhr.open('GET', 'http://localhost:8080/backend/get_content_list.php')
    xhr.send(null)
}

// Chargement du manifeste
function loadManifest(mpd = "http://localhost:8080//BentoDash/test_1/stream.mpd") {
    let video,
        player,
        url = mpd;

    video = document.querySelector(".videoDashJs");
    // video.innerHTML = ''
    // dashjs.MediaPlayer().reset();
    // player = dashjs.MediaPlayer().create();
    // player.initialize(video, url, true);
    video.src = mpd;
}