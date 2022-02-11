import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { getRefs } from './js/getRefs';
import { fetchCountries } from './js/fetchCountries';
import countryCardMany from './templates/country-card-many.hbs';
import countryCardOne from './templates/country-card-one.hbs';

const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  removeResults();
  let countryRequest = refs.searchBox.value.trim();
  if (!countryRequest) {
    return;
  }

  fetchCountries(countryRequest).then(displayCountry).catch(requestError);
}

function displayCountry(country) {
  if (country.length >= 2 && country.length < 11) {
    const markup = countryCardMany(country);
    refs.countriesList.innerHTML = markup;
  }
  if (country.length === 1) {
    const markup = countryCardOne(country);
    refs.countriesList.innerHTML = markup;
  }
  if (country.length > 10) {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }
}

function requestError() {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function removeResults() {
  refs.countriesList.innerHTML = '';
  refs.countriesInfo.innerHTML = '';
}
