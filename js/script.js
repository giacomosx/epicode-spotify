const getArtist = async (query) => {
    const endpoint = `http://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`;
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        return data.data

    } catch (error) {
        console.log(error);
    }
}

const createCards = (idSection, artist) => {
    const resultsContainer = document.querySelector(idSection);

    const col = document.createElement('div');
    idSection === '#cardsContainer__results' ? col.classList.add('col') : col.classList.add('swiper-slide');
    resultsContainer.append(col);

    const card = document.createElement('div');
    card.classList.add('card', 'mb-4', 'border-0');
    card.innerHTML = `  
    <div class="card-img">
        <img src="${artist.album.cover_medium}" alt="" class="w-100">
    </div>
    <div class="card-img-overlay p-0 overflow-hidden rounded-0">
        <div class="position-absolute bg-black opacity-75 w-100 p-2 card__info-container">
            <h5 class="text-white">${artist.title}</h5>
            <div class="button-wrapper d-flex align-items-center justify-content-around gap-2 ">
                <span class="likeBtn text-white"><i class="bi bi-heart"></i></span>
                <span class="playBtn text-white"><i class="bi bi-play"></i></span>
                <span class="moreBtn text-white">
                <i class="bi bi-three-dots-vertical"></i>
                </span>
            </div>
        </div>
    </div>`
    col.append(card);
}

const popolateSongsList = (artist) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'small', 'd-flex', 'justify-content-between');
    listItem.innerHTML = `${artist.artist.name} - ${artist.title} - ${(artist.duration/60).toFixed(2)}<i class="bi bi-plus-lg"></i>`;
    
    document.querySelector('.modal-body ul').append(listItem);
}


const swiper = new Swiper('.swiper', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        320: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 4,
        }
    },
    spaceBetween: 20,
    grabCursor: true
  });



getArtist('Band of Horses').then(res => {
    res.map(artist => {
        createCards('#cardsContainer__BandofHorses', artist);
        popolateSongsList(artist);
    })
})

getArtist('The Strokes').then(res => {
    res.map(artist => {
        createCards('#cardsContainer__TheStrokes', artist);
        popolateSongsList(artist);
    })
})

getArtist('The Vaccines').then(res => {
    res.map(artist => {
        createCards('#cardsContainer__TheVaccines', artist);
        popolateSongsList(artist);
    })
})

getArtist('Arctic Monkeys').then(res => {
    res.map(artist => {
        createCards('#cardsContainer__ArcticMonkeys', artist);
        popolateSongsList(artist);
    })
})

document.querySelector('#button-search').addEventListener('click', (query) => {
    document.querySelectorAll('.col').forEach(col => col.remove());
    document.querySelectorAll('.modal-body ul li').forEach(li => li.remove());
    
    document.getElementById('mainPage').style.display = 'none';
    
    query = document.querySelector('#searchField').value;
    
    getArtist(query).then(res => {
        res.map(artist => {
            createCards('#cardsContainer__results', artist)
            popolateSongsList(artist);
        })

        document.getElementById('resultsSection').style.display = 'flex';
        document.querySelector('.artistName').innerHTML = res[0].artist.name;
    })
})