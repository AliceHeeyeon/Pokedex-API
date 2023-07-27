# PokeDex App
- Display pokemon from [PokeAPI](https://pokeapi.co/) 
- Data can filtered by search term and type of pokemon.
- Access to individual pokemon data 

>### Challenge of this project
1. How to access detailed data
As default api provides name and url of each pokemon, need to access using the urls
```javascript
const response = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon?limit=151/`
                )      
                const pokemonData = response.data.results
               
                //Get detailed data using urls
                const detailedPokemonData = await Promise.all(
                    pokemonData.map(async (pokemon) => {
                        const pokemonResponse = await axios.get(pokemon.url)
                        const type = pokemonResponse.data.types.map((typeData) => typeData.type.name);
                        const ability = pokemonResponse.data.abilities.map((abilityData) => abilityData.ability.name)
                        const formattedNumber = String(pokemonResponse.data.id).padStart(3, '0');
                        return {
                            id : toRomanNumerals(pokemonResponse.data.id),
                            number: formattedNumber,
                            name : pokemon.name,
                            imageURL : pokemonResponse.data.sprites.other['official-artwork']
                            .front_default,
                            vividImage : pokemonResponse.data.sprites.other['dream_world']
                            .front_default,
                            frontImage : pokemonResponse.data.sprites.front_default,
                            backImage : pokemonResponse.data.sprites.back_default,
                            ability : ability,
                            types: type,
                            height: pokemonResponse.data.height,
                            weight: pokemonResponse.data.weight
                        };
                    })
                )  

```

2. Filter pokemon by search term and type
```javascript
const filteredData = pokedexes.filter((pokemon) => {
            //Filter based on the name and type
            const nameMatch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
            const typeMatch = !type || pokemon.types.includes(type.toLowerCase());
            return nameMatch && typeMatch
        })
```

>### side function for design
1. Change Id number to Roman numeral
- displayed Pokémon data using Roman numerals, aiming to evoke the nostalgic feeling of Pokémon cards
```javascript
const toRomanNumerals = (num) => {
    const romanNumerals = [
        { value: 100, numeral: 'C' },
        { value: 90, numeral: 'XC' },
        { value: 50, numeral: 'L' },
        { value: 40, numeral: 'XL' },
        { value: 10, numeral: 'X' },
        { value: 9, numeral: 'IX' },
        { value: 5, numeral: 'V' },
        { value: 4, numeral: 'IV' },
        { value: 1, numeral: 'I' },
    ]

    let result='';
    for (const{value, numeral} of romanNumerals) {
        while (num >= value) {
            result += numeral;
            num -= value;
        }
    }
    return result;
}
```
2. set the different background colors by types
```javascript
const typeColors = {
    normal: '#B8B08D',
    fire: '#EACFB7',
    water: '#A0C1D1',
    grass: '#9EBF8F',
    electric: '#F2E77A',
    ice: '#A1D2D0',
    fighting: '#B63D3A',
    poison: '#B06DAB',
    ground: '#D6C689',
    flying: '#B69FEC',
    psychic: '#E2868B',
    bug: '#A7BD5B',
    rock: '#BDAF6E',
    ghost: '#8D7B9C',
    dragon: '#8574F8',
    dark: '#8D7B6F',
    steel: '#B9B9CC',
    fairy: '#E3AFC3',
  };
```
```javascript
style={{backgroundColor: typeColors[item.types[0].toLowerCase()] }}
```

[Try the app](https://pokedex-api-nine-dusky.vercel.app/):sunglasses:

