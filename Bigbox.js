async function previousPokemon() {
    loading();
    let previousPokemon = await fetch(pokemonAPI + (PokemonOnDisplay.id - 1));
    let PokemonObject = await previousPokemon.json();
    preparePopup(PokemonObject);
    document.getElementById('prev_button').disabled = (PokemonOnDisplay.id == 1);
}

async function nextPokemon() {
    loading();
    let nextPokemon = await fetch(pokemonAPI + (PokemonOnDisplay.id + 1));
    let PokemonObject = await nextPokemon.json();
    preparePopup(PokemonObject);
    document.getElementById('prev_button').disabled = false;
}

function toggle_image() {
    let images = alt_images();
    let img_src = document.getElementById('img_big').src;
    let nextImg = (images.indexOf(img_src) + 1) % images.length;
    document.getElementById('img_big').src = images[nextImg];
}

function alt_images() {
    let image1 = PokemonOnDisplay.sprites.front_default;
    let image2 = PokemonOnDisplay.sprites.other.showdown.front_default;
    let image3 = PokemonOnDisplay.sprites.other["official-artwork"].front_default;
    return [image1, image2, image3];
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

async function fillEvolutionbar() {
    document.getElementById('evolutions').innerHTML = "";
    let EvolutionChainArray = await getEvolutions(PokemonOnDisplay.id);
    for (let index = 0; index < EvolutionChainArray.length; index++) {
        const evolution = EvolutionChainArray[index];        
        let result = await fetch(pokemonAPI + evolution);
        let PokemonObject = await result.json();        
        let image = PokemonObject.sprites.front_default;        
        document.getElementById('evolutions').innerHTML += `<img class="evolution_img" src=${image}></img>`;
        document.getElementsByClassName('evolution_img')[index].setAttribute("onclick", `fetchObject('${evolution}')`);
    }
}