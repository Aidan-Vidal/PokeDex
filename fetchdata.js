async function fetchPokemonData(Pokemon_name) {
        document.getElementById("loading").classList.remove("hidden");
        document.body.classList.add("loading");
        const result = await fetch(pokemonAPI + Pokemon_name);
        const PokemonObject = await result.json();
        document.getElementById("loading").classList.add("hidden");
        document.body.classList.remove("loading");
        return PokemonObject;
}

async function fetchAllTypes() {
    let result = await fetch("https://pokeapi.co/api/v2/type");
    let types = await result.json();
    for (let index = 0; index < types.results.length; index++) {
        const type = types.results[index].name;
        typesArray.push(type);
    }
}

async function getname(Pokemon_name) {
    let PokemonObject = await fetchPokemonData(Pokemon_name);
    return capitalize(PokemonObject.name);
}

async function getid(Pokemon_name) {
    let PokemonObject = await fetchPokemonData(Pokemon_name);
    return PokemonObject.id;
}

async function getweight(Pokemon_name) {
    let PokemonObject = await fetchPokemonData(Pokemon_name);
    return PokemonObject.weight;
}

async function getheight(Pokemon_name) {
    let PokemonObject = await fetchPokemonData(Pokemon_name);
    return PokemonObject.height;
}

async function gethp(Pokemon_name) {
    let PokemonObject = await fetchPokemonData(Pokemon_name);
    return PokemonObject.stats[0].base_stat;
}

async function getatk(Pokemon_name) {
    let PokemonObject = await fetchPokemonData(Pokemon_name);    
    return PokemonObject.stats[1].base_stat;
}

async function getdef(Pokemon_name) {
    let PokemonObject = await fetchPokemonData(Pokemon_name);    
    return PokemonObject.stats[2].base_stat;
}

async function getsp_atk(Pokemon_name) {
    let PokemonObject = await fetchPokemonData(Pokemon_name);    
    return PokemonObject.stats[3].base_stat;
}

async function getsp_def(Pokemon_name) {
    let PokemonObject = await fetchPokemonData(Pokemon_name);    
    return PokemonObject.stats[4].base_stat;
}

async function getspeed(Pokemon_name) {
    let PokemonObject = await fetchPokemonData(Pokemon_name);    
    return PokemonObject.stats[5].base_stat;
}

async function gettypes(Pokemon_name) {
    let PokemonObject = await fetchPokemonData(Pokemon_name);
    let types = [];
    for (let index = 0; index < PokemonObject.types.length; index++) {
        const type = PokemonObject.types[index].type.name;
        types.push(type);
    }
    return types;
}

async function getimage(Pokemon_name) {
    let PokemonObject = await fetchPokemonData(Pokemon_name);
    return PokemonObject.sprites.front_default;
}