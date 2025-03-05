async function fetchAllTypes() {
    let result = await fetch("https://pokeapi.co/api/v2/type");
    let types = await result.json();
    for (let index = 0; index < types.results.length; index++) {
        const type = types.results[index].name;
        typesArray.push(type);
    }
}

function loading() {
    document.getElementById("loading").classList.remove("hidden");
    document.body.classList.add("loading");
}

function loadingFinished() {
    document.getElementById("loading").classList.add("hidden");
    document.body.classList.remove("loading");
}