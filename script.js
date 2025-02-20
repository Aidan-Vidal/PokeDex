const pokemonAPI = "https://pokeapi.co/api/v2/pokemon/";
const allPokemonAPI = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
const speciesAPI = "https://pokeapi.co/api/v2/pokemon-species/"
let currentlyDisplayed = 0;
let typesArray = [];

async function init() {
    await fetchAllTypes();
    await morePokemon();
}

async function search() {
    if (document.getElementById('input').value.length < 3) {
        error_popup();
        document.getElementById('error_message').innerHTML = "Please type in at least 3 digits before searching!";
    } else {
        let input = document.getElementById('input').value.toLowerCase();
        let result = await searchCorrespondingPokemon(input);
        for (let index = 0; index < result.length; index++) {
            const Pokemon_name = result[index];
            search_result(Pokemon_name);
        }
        if (result.length == 0) {
            error_popup();
            document.getElementById('error_message').innerHTML = "Sorry, I couldn't find your Pokémon!";
        }
    }
}

async function searchCorrespondingPokemon(string) {
    let search_result = [];
    const result = await fetch(allPokemonAPI);
    const allPokemon = await result.json();
    let objectArray = allPokemon.results.filter(object => object["name"].includes(string))
    for (let index = 0; index < objectArray.length; index++) {
        const name = objectArray[index].name;
        search_result.push(name);
    }
    return search_result;
}

async function search_result(Pokemon_name) {
    currentlyDisplayed = 0;
    document.getElementById('infobox_small').innerHTML = "";
    await createSmallInfo(Pokemon_name);
    await fillSmallInfo(Pokemon_name);
}

function error_popup() {
    document.getElementById('error_message').innerHTML = "";
    document.getElementById("loading").classList.add("hidden");
    document.body.classList.remove("loading");
    document.getElementById('error').classList.remove('hidden');
    document.getElementById('bg_preventer').classList.remove('hidden');
}

async function previousPokemon() {
    let currentPokemon = document.getElementById(`name_big`).innerHTML;
    let currentPokemonID = await getid(currentPokemon);
    let result = await fetch(pokemonAPI + (currentPokemonID - 1));
    let PokemonObject = await result.json();
    let previousPokemon = capitalize(PokemonObject.name);
    fillBigInfo(previousPokemon);
}

async function nextPokemon() {
    let currentPokemon = document.getElementById(`name_big`).innerHTML;
    let currentPokemonID = await getid(currentPokemon);
    let result = await fetch(pokemonAPI + (currentPokemonID + 1));
    let PokemonObject = await result.json();
    let nextPokemon = capitalize(PokemonObject.name);
    fillBigInfo(nextPokemon);
}

async function toggle_image(Pokemon_name) {
    let images = await alt_images(Pokemon_name);
    let img_src = document.getElementById('img_big').src;
    let nextImg = (images.indexOf(img_src) + 1) % images.length;
    document.getElementById('img_big').src = images[nextImg];
}

async function alt_images(Pokemon_name) {
    let PokemonObject = await fetchPokemonData(Pokemon_name);
    let image1 = PokemonObject.sprites.front_default;
    let image2 = PokemonObject.sprites.other.showdown.front_default;
    let image3 = PokemonObject.sprites.other["official-artwork"].front_default;
    return [image1, image2, image3];
}

async function morePokemon() {
    let result = await fetch(createURL());
    let objectArray = await result.json();
    for (let index = 0; index < objectArray.results.length; index++) {
        const Pokemon_name = objectArray.results[index].name;
        await createSmallInfo(capitalize(Pokemon_name));
        await fillSmallInfo(capitalize(Pokemon_name));
    }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

async function getEvolutions(id) {
    let result = await fetch(speciesAPI+id);
    let speciesObject = await result.json();
    let EvolutionChainArray = await getEvolutionChain(speciesObject.evolution_chain.url);
    return EvolutionChainArray;
}

async function getEvolutionChain(url) {
    let result = await fetch(url);    
    let evolutionChain = await result.json();    
    let evolution_0 = evolutionChain.chain.species.name;
    let evolution_1 = evolutionChain.chain.evolves_to[0]?.species.name || null;
    let evolution_2 = evolutionChain.chain.evolves_to[0]?.evolves_to[0]?.species.name || null;
    return [evolution_0, evolution_1, evolution_2].filter(result => result !== null);
}

function toggleError() {
    document.getElementById('error').classList.toggle('hidden');
    document.getElementById('bg_preventer').classList.toggle('hidden');
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
}