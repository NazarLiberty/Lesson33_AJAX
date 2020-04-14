$(document).ready(
    getContent()
)


function showData() {
    let div = $('.div');
    let res = "";
    for (let i = 0; i < data.length; i++) {
        div.html(div.html() + `<div class="lol"> <img src="http://64.225.74.130/${data[i].src}" style="width:100%; object-fit: contain;"> <span class="span"> Author: ${data[i].author} </span> </div>`)
    }
}

let data;
function getContent() {
    const api = "http://64.225.74.130/api/paints/getstart"

    fetch(api)
        .then(function (response) {
            return response.json()
        })
        .then(function (Rdata) {
            data = Rdata;
        })

}