async function search() {
    loading();
    if (document.getElementById('input').value.length < 3) {
        error_popup();
        document.getElementById('error_message').innerHTML = "Please type in at least 3 digits before searching!";
    } else {
        let input = document.getElementById('input').value;
        await searchCorrespondingPokemon(input);
        if (fetchedPokemonObjects.length == 0) {
            error_popup();
            document.getElementById('error_message').innerHTML = "Sorry, I couldn't find your Pokémon!";
        } else {
            activeSearch = true;
            buildSmallInfo();
        }
    }
    loadingFinished();
}

async function searchCorrespondingPokemon(string) {
    fetchedPokemonObjects = [];
    const result = await fetch(allPokemonAPI);
    const allPokemon = await result.json();
    let objectArray = allPokemon.results.filter(object => object["name"].includes(string.toLowerCase()))
    for (let index = 0; index < objectArray.length; index++) {
        const Pokemon_name = objectArray[index].name;
        let result = await fetch(pokemonAPI + Pokemon_name);
        let PokemonObject = await result.json();
        fetchedPokemonObjects.push(PokemonObject);
    }
}

function error_popup() {
    document.getElementById('error_message').innerHTML = "";
    document.getElementById("loading").classList.add("hidden");
    document.body.classList.remove("loading");
    document.getElementById('error').classList.remove('hidden');
    document.getElementById('bg_preventer').classList.remove('hidden');
}

function toggleError() {
    document.getElementById('error').classList.toggle('hidden');
    document.getElementById('bg_preventer').classList.toggle('hidden');
}