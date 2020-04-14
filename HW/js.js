function getPage(pageOption, searchOption, seriesOption, movieOption, episodeOption) {
    let res = `page=${pageOption}&s=${searchOption}`
    if (seriesOption === true) res += "&type=series"
    if (movieOption === true) res += "&type=movie"
    if (episodeOption === true) res += "&type=episode"
    let url = `http://www.omdbapi.com/?${res}&apikey=a170dfba`
    fetch(url)
        .then((response) => response.json())
        .then(function (data) {
            Rdata = data;
            $('#content').addClass('content-block--active')
            $('#content').html(appendData())
            function appendData() {
                $('#pages').html('')
                $('#content').html('')
                if (data['Response'] == 'False') $('#content').append(`<h1 class="start_text"> Nothing found.. Try something else </h1>`)
                else {
                    for (let i = 0; i < data['Search'].length; i++) {
                        $('#content').append(`
                <div class="content-item">
                     <img src="${data['Search'][i]['Poster']}" class="item-img" alt="${data['Search'][i]['Title']}">
                     <button class="item-button"> Details </button>
                     <div class="item-info"><p> Title:
                     ${data['Search'][i]['Title']}
                     </p>
                      <p> Year:
                     ${data['Search'][i]['Year']}
                     </p>
                     <p> Type:
                     ${data['Search'][i]['Type']}
                     </p></div>
                </div>`)
                    }
                    $('.item-button').on('click', function () {
                        $(this).next().slideToggle()
                    })

                    for (let i = 0; i < data['totalResults'] / 10; i++) {
                        $('#pages').append(`<span class="pages__button"> ${i + 1} </span>`)
                    }
                    $('.pages__button').on('click', function () {
                        let _number = Number($(this).html())
                        getPage(_number, val, series, movie, episode);
                    })
                }
            }
        })
}
$('#series').on('click', function () {
    $('#movie')[0].checked = false;
    $('#episode')[0].checked = false;
})
$('#movie').on('click', function () {
    $('#series')[0].checked = false;
    $('#episode')[0].checked = false;
})
$('#episode').on('click', function () {
    $('#movie')[0].checked = false;
    $('#series')[0].checked = false;
})
let Rdata;
let val;
let series;
let movie;
let episode;
let search = $('#search');
$('#searchStart').on('click', function () {
    let _val = search.val();
    val = _val;
    let _series = $('#series').is(':checked');
    series = _series;
    let _movie = $('#movie').is(':checked');
    movie = _movie;
    let _episode = $('#episode').is(':checked');
    episode = _episode;
    getPage(1, _val, _series, _movie, _episode);
})


