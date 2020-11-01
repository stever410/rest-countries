const GET_COUNTRIES_URL = "https://restcountries.eu/rest/v2/all";
const GET_COUNTRIES_BY_NAME_URL = "https://restcountries.eu/rest/v2/name/";

let countriesList = [];
let searchInput = document.getElementById("search-country");
let darkMode = document.getElementById("dark-mode");
//toggle dropdown list
let dropdown = document.querySelector(".dropdown");
dropdown.addEventListener("click", (event) => {
  event.stopPropagation();
  dropdown.classList.toggle("is-active");
});

async function getAllCountries() {
  try {
    let respose = await fetch(GET_COUNTRIES_URL);
    let data = await respose.json();
    renderCountries(data);
  } catch (ex) {
    console.log(ex);
  }
}

async function getCountriesByName(searchVal) {
  try {
    let response = await fetch(GET_COUNTRIES_BY_NAME_URL + searchVal);
    let data = await response.json();
    renderCountries(data);
  } catch (ex) {
    console.log(ex);
  }
}

function renderCountries(countries) {
  let countriesGridView = document.getElementById("countries-grid");
  countriesGridView.innerHTML = "";
  countries.forEach((country) => {
    let countryEl = document.createElement("div");
    countryEl.classList.add("column");
    countryEl.classList.add("is-3");
    countryEl.innerHTML = `
        <div class="card">
            <div class="card-image">
                <figure class="image is-3by2">
                    <img src="${country.flag}" alt="Placeholder image">
                </figure>
            </div>
            <div class="card-content">
                <p class="title is-4 has-text-weight-bold">${country.name}</p>
                <div class="content">
                    <div><b>Population: </b> ${country.population}</div>
                    <div><b>Region: </b> ${country.region}</div>
                    <div><b>Capital: </b> ${country.capital}</div>
                </div>
            </div>
        </div>
    `;
    countriesGridView.appendChild(countryEl);
  });
}

// search countries when pressing enter
searchInput.addEventListener("keyup", (event) => {
  if(event.key === "Enter") {
    let searchVal = searchInput.value;
    getCountriesByName(searchVal);
  }
});

//toggle darkmode on click
darkMode.addEventListener("click", (event) => {
  // change navbar
  document.getElementsByClassName("navbar")[0].classList.toggle("dark-blue");
  document.getElementsByClassName("navbar")[0].classList.toggle("has-shadow");
  // change body background
  document.getElementsByTagName("body")[0].classList.toggle("very-dark-blue");
  // change cards
  let cards = document.getElementsByClassName("card");
  console.log(cards);
  for (let index = 0; index < cards.length; index++) {
    const element = cards[index];
    element.classList.toggle("dark-blue");
  }

  searchInput.classList.toggle("dark-blue");
  searchInput.classList.toggle("has-text-white");

});

getAllCountries();