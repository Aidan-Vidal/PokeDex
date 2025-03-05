const pokemonAPI = "https://pokeapi.co/api/v2/pokemon/";
const allPokemonAPI = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
const speciesAPI = "https://pokeapi.co/api/v2/pokemon-species/"
let currentlyDisplayed = 0;
let typesArray = [];
let fetchedPokemonObjects = [];
let PokemonOnDisplay;

async function init() {
    await fetchAllTypes();
    await fetchPokemonData();
}

async function fetchPokemonData() {
    let result = await fetch(createURL());
    let objectArray = await result.json();
    for (let index = 0; index < objectArray.results.length; index++) {
        const result = await fetch(pokemonAPI + objectArray.results[index].name);
        const PokemonObject = await result.json();
        fetchedPokemonObjects.push(PokemonObject);
    }
    buildSmallInfo();
}

function openPopup() {
    document.body.classList.add("no-scroll");
    document.getElementById('infobox_big').classList.remove('hidden');
    document.getElementById('bg_preventer').classList.remove('hidden');
}

function closePopup() {
    document.body.classList.remove("no-scroll");
    document.getElementById('infobox_big').classList.add('hidden');
    document.getElementById('bg_preventer').classList.add('hidden');
    PokemonOnDisplay = "";
}

async function fetchObject(Pokemon_name) {
    const result = await fetch(pokemonAPI + Pokemon_name);
    const PokemonObject = await result.json();
    preparePopup(PokemonObject);
}