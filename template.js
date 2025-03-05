
function createURL() {
    let url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=" + currentlyDisplayed.toString();
    currentlyDisplayed += 20;
    return url;
}

function buildSmallInfo() {
    document.getElementById("infobox_small").innerHTML = "";
    for (let index = 0; index < fetchedPokemonObjects.length; index++) {
        const PokemonObject = fetchedPokemonObjects[index];
        document.getElementById("infobox_small").innerHTML +=
        `<div class="infobox_small" id="${PokemonObject.name}" onclick="fetchObject('${PokemonObject.name}')">
        <div id="ID_${PokemonObject.name}"></div>
        <h2 id="name_${PokemonObject.name}"></h2>
        <img src="" id="img_${PokemonObject.name}" class="pokemon_img"></img>
        <div id="types_${PokemonObject.name}"></div></div>`;
        fillSmallInfo(PokemonObject);
    }
}

function fillSmallInfo(PokemonObject) {
    document.getElementById(`ID_${PokemonObject.name}`).innerHTML = createImg_ID(PokemonObject.id);
    document.getElementById(`name_${PokemonObject.name}`).innerHTML = PokemonObject.name;
    document.getElementById(`img_${PokemonObject.name}`).src = PokemonObject.sprites.front_default;
    for (let index = 0; index < PokemonObject.types.length; index++) {
        const type = PokemonObject.types[index].type.name;
        document.getElementById(`types_${PokemonObject.name}`).innerHTML = `<span class="type">${type}</span>`;
    }
}

function createImg_ID(num) {
  let imgString = `<img class="img_ID" src="./img/hash.png"></img>`;
  for (let index = 0; index < num.toString().length; index++) {
    const digit = num.toString()[index];
    imgString += `<img class="img_ID" src="./img/${digit}.png"></img>`;
  }
  return imgString;
}

function preparePopup(PokemonObject) {
    PokemonOnDisplay = PokemonObject;
    openPopup();
    document.getElementById(`name`).innerHTML = "Name: " + PokemonObject.name;
    document.getElementById(`hp`).innerHTML = "HP: " + PokemonObject.stats[0].base_stat;
    document.getElementById(`atk`).innerHTML = "Attack: " + PokemonObject.stats[1].base_stat;
    document.getElementById(`def`).innerHTML = "Defense: " + PokemonObject.stats[2].base_stat;
    document.getElementById(`sp_atk`).innerHTML = "Special Attack: " + PokemonObject.stats[3].base_stat;
    document.getElementById(`sp_def`).innerHTML = "Special Defense: " + PokemonObject.stats[4].base_stat;
    document.getElementById(`speed`).innerHTML = "Speed: " + PokemonObject.stats[5].base_stat;
    document.getElementById(`weight`).innerHTML = "Weight: " + PokemonObject.weight;
    document.getElementById(`height`).innerHTML = "Height: " + PokemonObject.height;
    document.getElementById('ID_big').innerHTML = createImg_ID(PokemonObject.id);
    document.getElementById(`name_big`).innerHTML = PokemonObject.name;
    document.getElementById('img_big').src = PokemonObject.sprites.front_default;
    document.getElementById('types_big').innerHTML = "";
    for (let index = 0; index < PokemonObject.types.length; index++) {
        const type = PokemonObject.types[index].type.name;
        document.getElementById(`types_big`).innerHTML += `<span class="type ${type}">${type}</span>`;
    }
    fillEvolutionbar();
}