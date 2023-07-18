let elCardUl = document.querySelector('.cards');

function normalizeTime(format){
    var newDate = new Date(format),
    day = String(newDate.getDate()).padStart(2, 0),
    month = String(newDate.getMonth() + 1).padStart(2, 0),
    year = newDate.getFullYear();

    return `${day}.${month}.${year}`
}

function renderingFilms(filmsArray){
    for(let i = 0; i < filmsArray.length; i++){

        //Creating new elements
    
        var newLi = document.createElement('li'),
        newImg = document.createElement('img'),
        newTitle = document.createElement('h3'),
        newDescription = document.createElement('p'),
        newTime = document.createElement('time'),
        newUl = document.createElement('ul');
    
        //Setting attributes
    
        newImg.setAttribute('src', filmsArray[i].poster)
        newImg.setAttribute('class', 'card_img')
        newLi.setAttribute('class', 'card')

        //Assign Values
        newTitle.textContent = filmsArray[i].title
        newDescription.textContent = filmsArray[i].overview
        newTime.textContent = normalizeTime(filmsArray[i].release_date)

        for(let p = 0; p < filmsArray[i].genres.length; p++){
            var newGenreLi = document.createElement('li')
            newGenreLi.textContent = filmsArray[i].genres[p]
            newUl.appendChild(newGenreLi)
        }

        //Appending elements
        newLi.appendChild(newImg)
        newLi.appendChild(newTitle)
        newLi.appendChild(newDescription)
        newLi.appendChild(newTime)
        newLi.appendChild(newUl)

        elCardUl.appendChild(newLi)
    }
    
}


//Getting elements 

let elTitleInput = document.querySelector('.title_input'),
elDescriptionInput = document.querySelector('.description_input'),
elYearInput = document.querySelector('.year_input'),
elImgInput = document.querySelector('.img_input'),
elGenreInput = document.querySelector('.genre_input'),
elSiteForm= document.querySelector('.site-form'),
elSubmitBtn = document.querySelector('.film-creator');

renderingFilms(films)


elSiteForm.addEventListener('submit', (evt)=> {
    evt.preventDefault()
    
    elCardUl.textContent = ''
    
    var newFilm = {
        title: "",
        poster: "",
        overview: "",
        release_date: "",
        genres: []
    }
    
    newFilm.title = elTitleInput.value
    newFilm.poster = elImgInput.value
    newFilm.overview = elDescriptionInput.value
    newFilm.release_date = elYearInput.value
    newFilm.genres = elGenreInput.value.split(' ')
    
    films.unshift(newFilm)
    renderingFilms(films)
    elTitleInput.value = ''
    elDescriptionInput.value = ''
    elYearInput.value = ''
    elImgInput.value = ''
    elGenreInput.value = ''
    
    })
