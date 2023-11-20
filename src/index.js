import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const refs = {
  select: document.querySelector('.breed-select'),
  infoBox: document.querySelector('.cat-info'),
  loaderText: document.querySelector('.loader'),
  errorText: document.querySelector('.error'),
}

refs.errorText.style.display = "none";

fetchBreeds()
  .then(({ data }) => data.forEach(({ id, name }) => {
    const option = document.createElement('option');
    option.value = id;
    option.text = name;
    refs.select.appendChild(option);
  }))
  .catch(() => {
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
  })
  .finally(() => {
    refs.loaderText.style.display = "none";
  });
          
refs.select.addEventListener('change', (e) => {
  refs.loaderText.style.display = "block";
  const selectedValue = e.target.value;
  fetchCatByBreed(selectedValue)
    .then(data => {
      const imgUrl = data.url;
      const name = data.breeds[0].name;
      const description = data.breeds[0].description;
      const temperament = data.breeds[0].temperament;

      const markup = `
      <img src="${imgUrl}" alt="${name}" width="400">
      <div class="text-content">
        <h2>${name}</h2>
        <p>${description}</p>
        <p><span class="temperament">Temperament: </span>${temperament}</p>
      </div>`;

      refs.infoBox.innerHTML = markup;
    })
    .catch(() => {
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      refs.loaderText.style.display = "none";
    });
})