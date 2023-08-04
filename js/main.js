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
    elDefaultGenre = document.querySelector(".default_option"),
    elSortSelect = document.querySelector(".sort-select"),
    elBookMarkBtn = document.querySelector(".bookmark-btn"),
    elBookMarkOpenBtn = document.querySelector(".bookmarks_open-btn"),
    elCardInfoModal = document.querySelector(".modal"),
    elCardModalTitle = document.querySelector(".card_modal-title"),
    elCardModalDescription = document.querySelector(".card_modal-description"),
    elCardModalYear = document.querySelector(".card_modal-release"),
    elCardModalGenres = document.querySelector(".card_modal-genres"),
    elModalCloseBtn = document.querySelector(".modal_close-sign"),
    elCardModalRandomNumber = document.querySelector(".imdb-score-random");

function normalizeTime(format) {
    var newDate = new Date(format),
        day = String(newDate.getDate()).padStart(2, 0),
        month = String(newDate.getMonth() + 1).padStart(2, 0),
        year = newDate.getFullYear();

    return `${day}.${month}.${year}`
}

function renderingFilms(filmsArray) {
    elCardUl.textContent = ""
    for (let i = 0; i < filmsArray.length; i++) {

        let idOfFilms = i + 1

        filmsArray[i].id = idOfFilms
        //Creating new elements

        let newLi = document.createElement('li'),
            newImg = document.createElement('img'),
            newTitle = document.createElement('h3'),
            newDescription = document.createElement('p'),
            newTime = document.createElement('time'),
            newUl = document.createElement('ul'),
            moreInfoBtn = document.createElement('button'),
            bookMarkBtn = document.createElement('img');

        //Setting Attributes

        newImg.setAttribute('src', filmsArray[i].poster)
        newImg.setAttribute('class', 'card_img')
        newLi.setAttribute('class', 'card')
        newLi.dataset.id = idOfFilms
        moreInfoBtn.setAttribute('class', 'card-btn more_info-btn')
        moreInfoBtn.dataset.id = idOfFilms
        bookMarkBtn.setAttribute('class', 'card-btn bookmark-btn')
        bookMarkBtn.setAttribute('class', 'bookmark-btn')
        bookMarkBtn.dataset.id = idOfFilms
        newTitle.setAttribute('class', 'card-title')
        newUl.setAttribute('class', 'card-info')


        //Assign Values

        newTitle.textContent = filmsArray[i].title
        newDescription.textContent = filmsArray[i].overview
        newTime.textContent = normalizeTime(filmsArray[i].release_date)
        moreInfoBtn.textContent = 'More Info'

        for (let p = 0; p < filmsArray[i].genres.length; p++) {
            var newGenreLi = document.createElement('li')
            newGenreLi.textContent = filmsArray[i].genres[p]
            newUl.appendChild(newGenreLi)
        }

        //Appending elements

        newLi.appendChild(newImg)
        newLi.appendChild(newTitle)
        newLi.appendChild(newUl)
        newLi.appendChild(bookMarkBtn)
        newLi.appendChild(moreInfoBtn)

        elCardUl.appendChild(newLi)
    }
}
sortTitle(films, 1, -1)
renderingFilms(films)

function sortTitle(array, tostart, toend) {
    array.sort((a, b) => {
        if (a.title > b.title) {
            return tostart
        } else if (a.title < b.title) {
            return toend
        } else {
            return 0
        }
    })
}

function sortFilmsReleaseYears(array, tostart, toend) {
    array.sort((a, b) => {
        if (a.release_date < b.release_date) {
            return toend
        } else if (a.release_date > b.release_date) {
            return tostart
        } else {
            return 0
        }
    })
}

function filteringGenres() {
    const newGenres = []

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
    renderingFilms(filterBySearch)

    let sortValue = elSortSelect.value

    if (sortValue == "a-z") {
        sortTitle(filterBySearch, 1, -1)
        renderingFilms(filterBySearch)
    } else if (sortValue == "z-a") {
        sortTitle(filterBySearch, -1, 1)
        renderingFilms(filterBySearch)
    } else if (sortValue == "old-new") {
        sortFilmsReleaseYears(filterBySearch, 1, -1)
        renderingFilms(filterBySearch)
    } else if (sortValue == "new-old") {
        sortFilmsReleaseYears(filterBySearch, -1, 1)
        renderingFilms(filterBySearch)
    }
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

const bookMarkedFilms = []
function bookmarkFilms(evt) {
    if (evt.target.matches('.bookmark-btn')) {
        evt.target.classList.add('bookmark-btn__active')

        films.forEach((film) => {
            // if (!evt.target.classList.contains('bookmark-btn__active')) {
            //     bookMarkedFilms.splice(film, 1)
            // }
            if (film.id == evt.target.dataset.id && !bookMarkedFilms.includes(film)) {
                bookMarkedFilms.push(film)
            }
        })
    }
    if (evt.target.matches('.more_info-btn')) {
        setTimeout(() => {
            films.forEach((film) => {
                if (film.id == evt.target.dataset.id) {
                    let randomNumber = Math.random().toFixed(1) * 10
                    elCardInfoModal.classList.add('card_info-opener')

                    elCardModalTitle.textContent = film.title
                    elCardModalDescription.textContent = film.overview
                    elCardModalYear.textContent = normalizeTime(film.release_date)
                    elCardModalGenres.textContent = film.genres
                    elCardModalRandomNumber.textContent = randomNumber + "." + Math.random().toFixed(1) * 10 + "/11"

                    elModalCloseBtn.addEventListener('click', () => {
                        elCardInfoModal.classList.remove('card_info-opener')

                    })
                    document.addEventListener('keydown', (e) => {
                        if (e.key == "Escape") {
                            elCardInfoModal.classList.remove('card_info-opener')

                        }
                    })
                }
            })
        }, 300);
    }
}
elCardUl.addEventListener('click', bookmarkFilms)

elBookMarkOpenBtn.addEventListener('click', () => {
    renderingFilms(bookMarkedFilms)

})
