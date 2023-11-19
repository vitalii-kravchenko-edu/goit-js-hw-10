import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_wysDxHIWn1IulUJabs3NacdnAMDR9vGHtaCjwaFa11YZOOlIlVimurfPTsq90hwW";

function fetchBreeds() {
  const BASE_URL = "https://api.thecatapi.com/v1";
  const END_POINT = "breeds";

  return axios
    .get(`${BASE_URL}/${END_POINT}`)
    .then(data => data)
};

function fetchCatByBreed(breedId) {
  const BASE_URL = "https://api.thecatapi.com/v1";
  const END_POINT = "images/search";
  const params = new URLSearchParams({
    breed_ids: breedId,
  });

  return axios
    .get(`${BASE_URL}/${END_POINT}?${params}`)
    .then(data => data.data[0])
};

export { fetchBreeds, fetchCatByBreed }