import './sass/main.scss';

import refs from './js/refs';
import fetchCountries from './js/fetchCountries';
import previewCountryTpl from './templates/preview-countryTpl.hbs'
import countryTpl from './templates/countryTpl.hbs'

import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const searchInput = () => {
    if (refs.search.value.length > 0) {
        refs.countriesMrkp.innerHTML = '';
        fetchCountries(refs.search.value)
        .then(response => dataShow(response));
    }
};

const dataShow = countries => {
    if (countries.length > 10) {
        error({
            text: 'Too many matches found. Please enter a more specific query!',
            delay: 5000,
        });
    }
    if (countries.length > 1 && countries.length < 10) {
        refs.countriesMrkp.innerHTML = previewCountryTpl(countries);
    }
    if (countries.length === 1) {
        refs.countriesMrkp.innerHTML = countryTpl(...countries);
    }
};

refs.search.addEventListener('input', debounce(searchInput, 500));