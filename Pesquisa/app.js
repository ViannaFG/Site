let API_KEY = 'ae193a59edecadb7ac03506854e25e2a';
let api_base_url = 'https://api.themoviedb.org/3/';
let image_base_url = 'https://image.tmdb.org/t/p/w1280';


function showNews(){
    let divScreen = document.getElementById('movie');
    let text = '';

    let dados = JSON.parse(this.responseText);
    for(i=0; i< dados.results.length; i++){
        let data = dados.results[i];
        console.log(data[i]);
        if(data.poster_path != null){
            text = text + `
            <div id="movie-${data.id}" class="col-2">
                    <div class="card shadow-sm">
                        <img class="cardImg" src="${image_base_url}${data.poster_path}">
                        <div class="card-body">
                            <h3 class="card-title">${data.title}</h3>
                            <p class="card-text" style="overflow: hidden; height: 60px;">${data.release_date}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <a class="hiper" href="Site/detalhes/?movie=?movie=${data.id}">VER MAIS </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
    }

    divScreen.innerHTML = text;
}

function searchStart()
{
    /*let query = document.getElementById('search-text').value;

    window.location.replace(`?search=${query}`);*/

    let query = document.getElementById('search-text').value;

    let xhr = new XMLHttpRequest();
    xhr.onload = showNews;
    xhr.open('GET', `${api_base_url}search/movie?api_key=${API_KEY}&query=${query}&language=pt-BR`);
    xhr.send();
}

// Carrousel

function NowPlay(){
    let divScreen = document.getElementById('banner');
    let text = '';

    let dados = JSON.parse(this.responseText);
    for(i=0; i< 6; i++){
        let data = dados.results[i];
        console.log(data[i]);
        text = text + `
        <div id="banner" class="col-4">
              <div class="card card-cover h-100 overflow-hidden text-white bg-dark rounded-4 shadow-lg">
                <div class="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                  <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">${data.title}</h2>
                  <ul class="d-flex list-unstyled mt-auto">
                  </ul>
                </div>
              </div>
            </div>
        `;
    }

    divScreen.innerHTML = text;
}

function NowPlayStart()
{
    let xhr = new XMLHttpRequest();
    xhr.onload = NowPlay;
    xhr.open('GET', `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=pt-BR&page=1`);
    xhr.send();
}

function showDetails(){
    alert('foi');

    let divScreen = document.getElementById('movie');
    let text = '';

    let dados = JSON.parse(this.responseText);
    const params = new URLSearchParams(window.location.search)


    for(i=0; i< dados.results.length; i++){
        let data = dados.results[i];
        console.log(data[i]);
        if(data.poster_path != null){
            text = text + `
            <div id="detalhes">
              <div class="row" style="padding: 50px;">
                  <div class="col">
                      <img class="imageD" src="${data.poster_path}">
                  </div>
                  <div class="col">
                      <h2>${data.title}</h2>
                      <h3>${data.Details}</h3>
                  </div>
              </div>
            </div>
            `;
        }
        
    }

    divScreen.innerHTML = text;
}

/*function Details()
{
    alert('foi');
    let query = document.getElementById('search-text').value;

    let xhr = new XMLHttpRequest();
    xhr.onload = showNews;
    xhr.open('GET', `${api_base_url}search/movie?api_key=${API_KEY}&query=${query}&language=pt-BR`);
    xhr.send();
}
*/
window.onload = NowPlayStart;
document.getElementById('search-btt').addEventListener('click', searchStart);
