
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight
    
    const abilities = pokeDetail.abilities.map((ability) => ability.ability.name)
    pokemon.abilities = abilities

    const hp = pokeDetail.stats.find((stat) => stat.stat.name === "hp")
    pokemon.hp = hp.base_stat

    const attack = pokeDetail.stats.find((stat) => stat.stat.name === "attack")
    pokemon.attack = attack.base_stat

    const defense = pokeDetail.stats.find((stat) => stat.stat.name === "defense")
    pokemon.defense = defense.base_stat

    const specialAttack = pokeDetail.stats.find((stat) => stat.stat.name === "special-attack")
    pokemon.specialAttack = specialAttack.base_stat

    const specialDefense = pokeDetail.stats.find((stat) => stat.stat.name === "special-defense")
    pokemon.specialDefense = specialDefense.base_stat

    const speed = pokeDetail.stats.find((stat) => stat.stat.name === "speed")
    pokemon.speed = speed.base_stat

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemonById = (id) => {  
    return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.json()) 
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemonEvolution = (id) => {
    const url = `https://pokeapi.co/api/v2/evolution-chain/${id}`
        return fetch(url).then((response) => response.json())
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
