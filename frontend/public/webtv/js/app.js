function loadVideo(strurl) {
    var player = document.getElementById("videoPlayer");
    //dashjs.MediaPlayer().reset();
    var dashpl = dashjs.MediaPlayer().create();
    dashpl.initialize(player, strurl, true);
}

let divrep = document.querySelector('.section.linkVOD .container ul')

window.addEventListener('load', () => {
    requete()
})


function requete() {
    xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.readyState === 4) {
            let response = JSON.parse(xhr.responseText);
            response.forEach(el => {
                divrep.innerHTML += `<li><a href="${el.videoUrl}" class="has-text-primary">${el.videoId}</a></li>`
            })
        }
    })
    
    xhr.open('GET', 'http://localhost:8080/backend/get_content_list.php');
    xhr.send(null)

}