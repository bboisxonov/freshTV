//Getting elements

let elCardUl = document.querySelector('.cards'),
    elMainSection = document.querySelector('.main_section'),
    elSearchButton = document.querySelector('.search_button'),
    // elSearchSection = document.querySelector('.search-section_active'),
    elInputRemoveSign = document.querySelector('.input_remove_sign'),
    elShowFormButton = document.querySelector('.open_form_btn'),
    elSearchInput = document.querySelector('.search_input'),
    elNavList = document.querySelector('.nav_list'),
    elSiteNavForm = document.querySelector('.site_nav_form'),
    elTitleInput = document.querySelector('.title_input'),
    elDescriptionInput = document.querySelector('.description_input'),
    elYearInput = document.querySelector('.year_input'),
    elImgInput = document.querySelector('.img_input'),
    elGenreInput = document.querySelector('.genre_input'),
    elSiteForm = document.querySelector('.site-form'),
    elSubmitBtn = document.querySelector('.film-creator'),
    elResolutionText = document.querySelector('.resolution_text'),
    elFormSelect = document.querySelector('.form_select'),
    elFilterButton = document.querySelector('.filter_button'),
    elDefaultGenre = document.querySelector(".default_option");

function normalizeTime(format) {
    var newDate = new Date(format),
        day = String(newDate.getDate()).padStart(2, 0),
        month = String(newDate.getMonth() + 1).padStart(2, 0),
        year = newDate.getFullYear();

    return `${day}.${month}.${year}`
}

function renderingFilms(filmsArray) {
    for (let i = 0; i < filmsArray.length; i++) {

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

        for (let p = 0; p < filmsArray[i].genres.length; p++) {
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
renderingFilms(films)

function filteringGenres() {
    var newGenres = []

    films.forEach(film => {
        film.genres.forEach(genre => {
            if (!newGenres.includes(genre)) { newGenres.push(genre) }
        })
    })

    newGenres.forEach(item => {
        var newOption = document.createElement('option')

        newOption.textContent = item

        elFormSelect.appendChild(newOption)
    })
}
filteringGenres()

elSiteForm.addEventListener('submit', (evt) => {
    evt.preventDefault()

    if (elTitleInput.value == "" || elYearInput.value == "") {
        elResolutionText.textContent = 'Please, enter some info!'
        return
    } else {
        elResolutionText.textContent = ""
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
    }
})

elSiteNavForm.addEventListener("submit", (evt) => {
    evt.preventDefault()

    const searchValue = elSearchInput.value.trim();
    const selectValue = elFormSelect.value.trim();

    let filterByGenre = []
    if (selectValue === 'All') {
        filterByGenre = films

    } else {
        filterByGenre = films.filter(film =>
            film.genres.includes(selectValue)
        )
    }

    let regex = RegExp(searchValue, 'gi')

    let filterBySearch = filterByGenre.filter(film =>
        film.title.match(regex)
    )
    elCardUl.textContent = ""
    renderingFilms(filterBySearch)
})

elSearchButton.addEventListener('click', () => {
    elNavList.classList.add('search_input--active')
    setTimeout(() => {
        elInputRemoveSign.style.display = "block"
    }, 60);
    setTimeout(() => {
        elInputRemoveSign.style.transform = "rotate(135deg)"

    }, 90);
})

elInputRemoveSign.addEventListener('click', () => {
    elNavList.classList.remove('search_input--active')
    elInputRemoveSign.style.display = "none"
    elInputRemoveSign.style.transform = "rotate(45deg)"
})

elShowFormButton.addEventListener('click', () => {
    elMainSection.classList.toggle('form_active')
    elShowFormButton.classList.toggle('close_form_btn')
})