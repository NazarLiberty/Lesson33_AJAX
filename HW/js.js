function getPage(pageOption, searchOption, seriesOption, movieOption, episodeOption) {
    let res = `page=${pageOption}&s=${searchOption}`
    if (seriesOption === true) res += "&type=series"
    if (movieOption === true) res += "&type=movie"
    if (episodeOption === true) res += "&type=episode"
    let url = `https://www.omdbapi.com/?${res}&apikey=a170dfba`
    // API Customisation
    fetch(url)
        .then((response) => response.json())
        .then(function (data) {
            Rdata = data;
            $('#content').html(appendData())
            function appendData() {
                $('#pages').html('')

                $('#content').html(' <div class="favorite favorite--small"> My favorite list </div>')

                if (data['Response'] == 'False') $('#content').append(`<h1 class="start_text"> Nothing found.. Try something else </h1>`)
                else {
                    // (start) loop for content display from API by search
                    let _style = ""
                    for (let i = 0; i < data['Search'].length; i++) {
                        if (localStorage.getItem(data['Search'][i]['imdbID']))
                            _style = 'style="fill: yellow;"'
                        else _style = 'style="fill: transparent;"'
                        $('#content').append(`
   
    <div class="content-item">
        <div class="item-img-b">
            <img src="${data['Search'][i]['Poster']}" class="item-img" alt="${data['Search'][i]['Title']}"> 
                 <div class="item-fav" id="out${data['Search'][i]['imdbID']}">
                   <svg class="fav"
                       enable-background="new 0 0 24 24" height="28" viewBox="0 0 24 24" width="28"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                       d="m22.765 9.397c-.08-.24-.288-.414-.538-.453l-6.64-1.015-2.976-6.34c-.222-.474-.999-.474-1.222 0l-2.976 6.341-6.64 1.015c-.25.038-.458.213-.538.453s-.019.505.157.686l4.824 4.945-1.14 6.99c-.042.255.066.512.277.66s.489.164.715.039l5.932-3.279 5.931 3.278c.102.057.214.084.327.084.137 0 .273-.041.389-.123.211-.149.319-.406.277-.66l-1.14-6.99 4.824-4.945c.177-.181.237-.446.157-.686z"
                       id="${data['Search'][i]['imdbID']}" fill="transparent" ${_style}/>
                       <path fill="yellow"
                    d="m5.574 15.362-1.267 7.767c-.046.283.073.568.308.734.234.165.543.183.795.043l6.59-3.642 6.59 3.643c.114.062.239.093.363.093.152 0 .303-.046.432-.137.235-.166.354-.451.308-.734l-1.267-7.767 5.36-5.494c.196-.201.264-.496.175-.762-.089-.267-.32-.46-.598-.503l-7.378-1.127-3.307-7.044c-.247-.526-1.11-.526-1.357 0l-3.306 7.044-7.378 1.127c-.278.043-.509.236-.598.503s-.022.561.174.762zm3.063-6.464c.247-.038.459-.196.565-.422l2.798-5.961 2.798 5.96c.106.226.318.385.565.422l6.331.967-4.605 4.72c-.167.17-.242.41-.204.645l1.08 6.617-5.602-3.096c-.113-.062-.238-.094-.363-.094s-.25.031-.363.094l-5.602 3.096 1.08-6.617c.038-.235-.037-.474-.204-.645l-4.605-4.72z" />
                </svg>
           </div>
       </div>
               
       <button class="item-button"> Details </button>
           <div class="item-info">
           <p> Title:
               ${data['Search'][i]['Title']}
               </p>
                <p> Year:
               ${data['Search'][i]['Year']}
               </p>
               <p> Type:
               ${data['Search'][i]['Type']}
                </p>
           </div>
       </div>
       `)
                        // Favorite start click and push to local storage

                        $(`#out${data['Search'][i]['imdbID']}`).on('click', function () {
                            //*//*//
                            if ($(`#${data['Search'][i]['imdbID']}`).attr('style') == 'fill: yellow;') {
                                $(`#${data['Search'][i]['imdbID']}`).css('fill', 'transparent')
                                localStorage.removeItem(data['Search'][i]['imdbID'])
                            }
                            else {
                                localStorage.setItem(data['Search'][i]['imdbID'], $(`#${data['Search'][i]['imdbID']}`).attr('id'))
                                $(`#${data['Search'][i]['imdbID']}`).css('fill', 'yellow')
                            }
                        })
                    }
                    // (end) loop for content display from API

                    // info click
                    $('.item-button').on('click', function () {
                        $(this).next().slideToggle()
                    })
                    // pages loop
                    for (let i = 0; i < data['totalResults'] / 10; i++) {
                        if (pageOption == i + 1) {
                            $('#pages').append(`<span class="pages__button pages__button--active"> ${i + 1} </span>`)
                        }
                        else $('#pages').append(`<span class="pages__button"> ${i + 1} </span>`)

                    }
                    // pages click load
                    $('.pages__button').on('click', function () {
                        let _number = Number($(this).html())
                        getPage(_number, val, series, movie, episode);

                    })
                    // favorite list by search page
                    $('.favorite').on('click', () => {
                        $('#content').hide();
                        getFavorite();
                        $('#content').slideDown('slow');
                    })
                }
            }
        })
}


// favorite fetch
function getFavorite() {
    favData = [];
    $('#pages').html('')
    $('#content').html('')
    let _id = "";
    let _url = "";
    // key search loop
    if (!localStorage.length) {
        $('#pages').html('')
        $('#content').html('')
        $('#content').append(`<h1 class="favorite">
    Your favorite list is empty. Start searching!`)
    }
    else {
        for (let key in localStorage) {
            switch (key) {
                case "length": break;
                case "key": break;
                case "getItem": break;
                case "setItem": break;
                case "removeItem": break;
                case "clear": break;
                default: _id = key;
                    _url = `https://www.omdbapi.com/?i=${_id}&apikey=a170dfba`
                    fetch(_url)
                        .then(function (response) {
                            return response.json()
                        })
                        .then(function (data) {
                            favData.push(data);

                            $('#content').append(`<div class="content-item">
                        <div class="item-img-b">
                            <img src="${data['Poster']}" class="item-img" alt="${data['Title']}"> 
                                 <div class="item-fav" id="out${data['imdbID']}">
                                   <svg class="fav"
                                       enable-background="new 0 0 24 24" height="28" viewBox="0 0 24 24" width="28"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                       d="m22.765 9.397c-.08-.24-.288-.414-.538-.453l-6.64-1.015-2.976-6.34c-.222-.474-.999-.474-1.222 0l-2.976 6.341-6.64 1.015c-.25.038-.458.213-.538.453s-.019.505.157.686l4.824 4.945-1.14 6.99c-.042.255.066.512.277.66s.489.164.715.039l5.932-3.279 5.931 3.278c.102.057.214.084.327.084.137 0 .273-.041.389-.123.211-.149.319-.406.277-.66l-1.14-6.99 4.824-4.945c.177-.181.237-.446.157-.686z"
                                       id="${data['imdbID']}" fill="transparent" style="fill: yellow;"/>
                                       <path fill="yellow"
                                    d="m5.574 15.362-1.267 7.767c-.046.283.073.568.308.734.234.165.543.183.795.043l6.59-3.642 6.59 3.643c.114.062.239.093.363.093.152 0 .303-.046.432-.137.235-.166.354-.451.308-.734l-1.267-7.767 5.36-5.494c.196-.201.264-.496.175-.762-.089-.267-.32-.46-.598-.503l-7.378-1.127-3.307-7.044c-.247-.526-1.11-.526-1.357 0l-3.306 7.044-7.378 1.127c-.278.043-.509.236-.598.503s-.022.561.174.762zm3.063-6.464c.247-.038.459-.196.565-.422l2.798-5.961 2.798 5.96c.106.226.318.385.565.422l6.331.967-4.605 4.72c-.167.17-.242.41-.204.645l1.08 6.617-5.602-3.096c-.113-.062-.238-.094-.363-.094s-.25.031-.363.094l-5.602 3.096 1.08-6.617c.038-.235-.037-.474-.204-.645l-4.605-4.72z" />
                                </svg>
                           </div>
                       </div>
                               
                       <button class="item-button" id="btn${data['imdbID']}"> Details </button>
                           <div class="item-info">
                           <p> Title:
                               ${data['Title']}
                               </p>
                                <p> Year:
                               ${data['Year']}
                               </p>
                               <p> Type:
                               ${data['Type']}
                                </p>
                           </div>
                       </div>
                       `)
                            // Favorite start click and push to local storage

                            $(`#out${data['imdbID']}`).on('click', function () {
                                //*//*//
                                if ($(`#${data['imdbID']}`).attr('style') == 'fill: yellow;') {
                                    $(`#${data['imdbID']}`).css('fill', 'transparent')
                                    localStorage.removeItem(data['imdbID'])
                                }
                                else {
                                    localStorage.setItem(data['imdbID'], $(`#${data['imdbID']}`).attr('id'))
                                    $(`#${data['imdbID']}`).css('fill', 'yellow')
                                }
                            })
                            // info click
                            $(`#btn${data['imbdID']}`).on('click', function () {
                                $(`#btn${data['imbdID']}`).next().slideToggle()
                            })
                        })
            }
        }
    }
}

$('.favorite').on('click', () => {
    $('#content').hide();
    getFavorite();
    $('#content').slideDown('slow');
})

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
let favData = [];
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


