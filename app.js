const GET_COUNTRIES_URL = "https://restcountries.eu/rest/v2/all";

//toggle dropdown list
let dropdown = document.querySelector('.dropdown');
dropdown.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdown.classList.toggle('is-active');
});

async function getAllCountries() {
    try {
        let respose = await fetch(GET_COUNTRIES_URL);
        return respose.json();
    } catch(err) {
        console.log(err);
    }
}

function renderCountries(countries) {
    
}