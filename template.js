function createImg_ID(num) {
    let imgString = `<img class="img_ID" src="/img/hash.png"></img>`;
    for (let index = 0; index < num.toString().length; index++) {
        const digit = num.toString()[index];
        imgString += `<img class="img_ID" src="/img/${digit}.png"></img>`;
    }
    return imgString;
}

function createURL() {
    let url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=" + (currentlyDisplayed).toString();
    currentlyDisplayed += 20;
    return url;
}

async function createSmallInfo(Pokemon_name) {
    let result = await gettypes(Pokemon_name);
    let type = "";
    for (let index = 0; index < result.length; index++) {
        type += `<span class="type">${result[index]}</span>`;
    }
    document.getElementById('infobox_small').innerHTML +=
    `<div class="infobox_small ${result[0]}" id="${Pokemon_name}" onclick="fillBigInfo('${Pokemon_name}')">
        <div id="ID_${Pokemon_name}"></div>
        <h2 id="name_${Pokemon_name}"></h2>
        <img src="" id="img_${Pokemon_name}" class="pokemon_img"></img>
        <div id="types_${Pokemon_name}">${type}</div>
    </div>`;
}

async function fillBigInfo(Pokemon_name) {
    openPopup();
    document.getElementById(`name`).innerHTML = "Name: " + Pokemon_name;
    document.getElementById(`hp`).innerHTML = "HP: " + await gethp(Pokemon_name);
    document.getElementById(`atk`).innerHTML = "Attack: " + await getatk(Pokemon_name);
    document.getElementById(`def`).innerHTML = "Defense: " + await getdef(Pokemon_name);
    document.getElementById(`sp_atk`).innerHTML = "Special Attack: " + await getsp_atk(Pokemon_name);
    document.getElementById(`sp_def`).innerHTML = "Special Defense: " + await getsp_def(Pokemon_name);
    document.getElementById(`speed`).innerHTML = "Speed: " + await getspeed(Pokemon_name);
    document.getElementById(`weight`).innerHTML = "Weight: " + await getweight(Pokemon_name);
    document.getElementById(`height`).innerHTML = "Height: " + await getheight(Pokemon_name);
    document.getElementById('ID_big').innerHTML = createImg_ID(await getid(Pokemon_name));
    document.getElementById(`name_big`).innerHTML = await getname(Pokemon_name);
    document.getElementById('img_big').src = await getimage(Pokemon_name);
    let types = await gettypes(Pokemon_name);
    document.getElementById('types_big').innerHTML = "";
    for (let index = 0; index < types.length; index++) {
        document.getElementById('types_big').innerHTML += `<span class="type ${types[index]}">${types[index]}</span>`;
    }
    document.getElementById('toggle_img').setAttribute("onclick", `toggle_image('${Pokemon_name}')`);
    await fillEvolutionbar(Pokemon_name);
}

async function fillSmallInfo(Pokemon_name) {
    document.getElementById(`ID_${Pokemon_name}`).innerHTML += createImg_ID(`${await getid(Pokemon_name)}`);
    document.getElementById(`name_${Pokemon_name}`).innerHTML += Pokemon_name;
    document.getElementById(`img_${Pokemon_name}`).src = await getimage(Pokemon_name);
}

async function fillEvolutionbar(Pokemon_name) {
    document.getElementById('evolutions').innerHTML = "";
    let id = await getid(Pokemon_name);
    let EvolutionChainArray = await getEvolutions(id);
    for (let index = 0; index < EvolutionChainArray.length; index++) {
        const evolution = EvolutionChainArray[index];
        let image = await getimage(evolution);
        document.getElementById('evolutions').innerHTML += `<img class="evolution_img" src=${image}></img>`;
        document.getElementsByClassName('evolution_img')[index].setAttribute("onclick", `fillBigInfo('${evolution}')`);
    }
}