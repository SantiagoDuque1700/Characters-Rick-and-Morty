const API = 'https://rickandmortyapi.com/api/character/';

function getData(cond) {
    fetch(API+cond)
    .then(function(response) {
        return response.json();
    })
    .catch(function(err) {
        console.log(err)
    })
    .then(function(myJson) {
        let list = myJson.results;
        let cont = document.getElementById('characters');
        cont.innerHTML = '';
        list.map(function(item) {
            let html = `<article class="characters-cart">
                    <div class="characters-img">   
                        <img src="${item.image}" alt="">
                    </div>
                    <div  class="character-info">
                        <div>
                            <h2>${item.name}</h2> 
                            <span class="status">
                                <span class="status-icon"></span>
                                <p>${item.status} - ${item.species}</p>
                            </span>
                        </div>
                        <br>
                        <div>
                            <span class="gray-text">Last known location:</span> 
                            <p>${item.location.name}</p>
                        </div>
                        <br>
                        <div>
                            <span class="gray-text">Origin:</span> 
                            <p>${item.origin.name}</p>
                        </div>
                    </div>
                </article>`;

            cont.innerHTML += html;

        });

        getButtons(myJson.info);
        getCount(myJson.info.count);
        getPage(myJson.info.next,myJson.info.pages);
    });
}

function getButtons(info) {
    let btnPrev = document.getElementById('prev');
    let btnNext = document.getElementById('next');

    if(info.prev != null){
        var prevUrl = info.prev.split(/\w*[:/.]/);
        var prevUrl = prevUrl.filter(Boolean);
        btnPrev.setAttribute('onclick',`getData("${prevUrl}")`);
        btnPrev.style.display = 'block';
    }else{
        btnPrev.style.display = 'none';
    }

    if(info.next != null) {
        var nextUrl = info.next.split(/\w*[:/.]/);
        var nextUrl = nextUrl.filter(Boolean);
        btnNext.setAttribute('onclick',`getData("${nextUrl}")`);
        btnNext.style.display = 'block';
    }else{
        btnNext.style.display = 'none';
    }
}

function getCount(count) {
    let text = document.getElementById('count');
    text.innerHTML = `Characters:  ${count}`;
}

function getPage(nextUrl,max) {
    let pages = document.getElementById('pages');
    if(nextUrl == null){
        pages.innerHTML = `${max} / ${max}`
    }else {
        var num = nextUrl.split(/\w*[:/.?]\w*=?/);
        var num = num.filter(Boolean);  
        pages.innerHTML = `${parseInt(num) - 1} / ${max}`
    }
}

getData('')