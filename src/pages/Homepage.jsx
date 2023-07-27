import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Puff } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { PokeContext } from '../context/PokeContext';

//function for changing num to roman num
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

// Set colors by types
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
  

const Homepage = () => {
    // set up the poke context
    const { setSelectedPokemon } = useContext(PokeContext)
    // useState definitions for all inputs 
    const [searchTerm, setSearchTerm] = useState('')
    const [type, setType] = useState('')
    // set a state for pokedex
    const [pokedexes, setPokedexes] = useState([])
    // set a state for loading
    const [loading, setLoading] = useState(true)
    // define useNavigate
    const navigate = useNavigate()
    // setup filtered state
    const [filteredPokedex, setFilteredPokedex] = useState([]);

    // initial render
    useEffect(() => {
        const fetchPokemon = async () => {
            setLoading(true)
            try {
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

                const pokemons = detailedPokemonData.map
                ((pokemon) => {
                    return {
                        //spread operator
                        ...pokemon,
                        onSelect: () => setSelectedPokemon(pokemon)
                    }
                })
                setLoading(false)  
                // put data in pokedexes to use filter function in second useEffect      
                setPokedexes(pokemons);
                // initialize filteredPokedex with all pokemon data
                setFilteredPokedex(pokemons);
                
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }
        fetchPokemon()
    },[])

    // render when searchTerm or type change
    useEffect(() => {
        const fetchPokemon = async () => {
            setLoading(true)
            try {
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
                        console.log(pokemonResponse);
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
                const pokemons = detailedPokemonData.map
                ((pokemon) => {
                    return {
                        //spread operator
                        ...pokemon,
                        onSelect: () => setSelectedPokemon(pokemon)
                    }
                })
                setLoading(false)         
                setPokedexes(pokemons);
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }
        fetchPokemon()

        // Filter pokedexes based on searchTerm and type
        const filteredData = pokedexes.filter((pokemon) => {
            //Filter based on the name and type
            const nameMatch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
            const typeMatch = !type || pokemon.types.includes(type.toLowerCase());
            return nameMatch && typeMatch
        })

        //Set the filtered data to the state
        setFilteredPokedex(filteredData);

    },[searchTerm, type])
    

  return (
    <div id='homepage'>
        {/* Search Bar */}
        <div id='section-search'>
            <label htmlFor='search'>Search</label>
            <input
                type='text'
                name='search'
                id='search'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        {/* Type select */}
        <div id='section-type'>
            <label htmlFor='type'>Type</label>
            <select
                name='type'
                id='type'
                value={type}
                onChange={(e) => setType(e.target.value)}
            >
                <option value=''>Choose the type...</option>
                <option value='normal'>normal</option>
                <option value='fire'>fire</option>
                <option value='water'>water</option>
                <option value='grass'>grass</option>
                <option value='electric'>electric</option>
                <option value='ice'>ice</option>
                <option value='fighting'>fighting</option>
                <option value='poison'>poison</option>
                <option value='ground'>ground</option>
                <option value='flying'>flying</option>
                <option value='psychic'>psychic</option>
                <option value='bug'>bug</option>
                <option value='rock'>rock</option>
                <option value='ghost'>ghost</option>
                <option value='dragon'>dragon</option>
                <option value='dark'>dark</option>
                <option value='steel'>steel</option>
                <option value='fairy'>fairy</option>
            </select>
        </div>

        <div id='pokedex-box-grid'>
            {loading ? (
                <Puff color='#00BFFF' height={100} width={100}/>
            ) : pokedexes.length === 0 ? (<p>No Pokemon Found</p>) :
            (     
            filteredPokedex.map((item) => (
                <div 
                    key={item.imageURL} 
                    id='pokedex-box'
                    // box color are vary depends on types
                    style={{backgroundColor: typeColors[item.types[0].toLowerCase()]
                    }}
                    onClick={() => {
                        item.onSelect()
                        navigate('/pokemon/')
                        }
                    }
                >
                    <img src={item.imageURL} alt={item.name}/>
                    <p id='poke-id'>{item.id}</p>
                    <p id='poke-name'>{item.name}</p>
                    <p id='poke-type'>{item.types.join(", ")}</p>
                </div>
                ))       
            )}
      </div>
    </div>
  )
}

export default Homepage
