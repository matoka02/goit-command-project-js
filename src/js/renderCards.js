import { refs } from '../index';
import { getPagination } from './pagination';
import { onSubmitScroll } from './onSubmit';

export function renderCards({ data }) {
  refs.cardHolder.innerHTML = data.results.map(({ id, poster_path, name, title, release_date, genre_ids, original_language, }) => {
    return `
    <li class="film__item" id="${id}">
      <a class="film__item__link">${getMarkupImgPoster(original_language, poster_path, name, title)}
        <h2>${getShortName(title || name)}</h2>
        <p> ${getGenresByID(genre_ids)} | ${getYear(release_date)}</p>
        <button class="film__trailer-btn" type="button">Trailer 
          <span class="film__trailer-btn">&#9654;</span>
        </button>
      </a>
    </li>`;
  }).join('') +
    `<li class="film__item__prytula">
    <a onclick="event.stopPropagation()" href="https://prytulafoundation.org/" target="blank" class="film__item__prytula__link">
      <h2>SUPPORT UKRAINE</h2>
      <p>Support the Defense Forces of Ukraine</p>
    </a>
  </li>`;

  refs.prytulaBannerTab.innerHTML = `
  <div class="film__item__prytula__tab">
    <a onclick="event.stopPropagation()" href="https://prytulafoundation.org/" target="blank" class="film__item__prytula__tab__link">
      <a onclick="event.stopPropagation()" href="https://prytulafoundation.org/" target="blank">
        <h2>SUPPORT UKRAINE</h2>
        <p>Support the Defense Forces of Ukraine</p>
      </a>
    </a>
  </div>`;

  onSubmitScroll();

  getPagination(data.page, data.total_pages);
};

const genreIdName = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

export function getGenresByID(genreId) {
  const newArr = [];
  genreIdName.map(genre => {
    for (const id in genreId) {
      if (genre.id === id) newArr.push(genre.name);
    }
  });
  if (newArr.length >= 2) {
    const sliceArr = newArr.slice(0, 2);
    sliceArr[2] = 'Other';
    return sliceArr;
  } else {
    return 'Other';
  }
};

export function getShortName(string) {
  if (string) {
    if (string.length >= 32) {
      return string.substr(0, 32) + '...';
    }
    return string;
  }
};

export function getYear(date) {
  return date ? date.split('-')[0] : '2023';
};

function getPosterPath(path) {
  return `https://www.themoviedb.org/t/p/w500${path}`;
};

export function getMarkupImgPoster(original_language, poster_path, name, title) {
  if (poster_path && original_language !== 'ru') {
    return `<img src=" ${getPosterPath(poster_path)}" alt="${name || title}" loading="lazy" />`;
  } else if (original_language === 'ru') {
    return `<img src="https://i.ibb.co/gDNWHNY/Group-91.png" alt="${name || title}" loading="lazy" />`;
  };
  return ``;
};