let btn = document.getElementById('requeteAjax');
let divrep = document.getElementById('rep');

btn.addEventListener('click', () => {
    requete();
});


function requete() {
    xhr = new XMLHttpRequest();

    xhr.addEventListener('progress', function (e) {

        divrep.innerHTML = e.loaded + ' / ' + e.total;

    });
    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.readyState === 4) {
            let response = JSON.parse(xhr.responseText);
            console.log(response.test);
            divrep.textContent = response.test
        }
    })

    xhr.open('GET', './infos.json');
    xhr.send(null)

}