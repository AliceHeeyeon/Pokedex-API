import {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { PokeContext } from '../context/PokeContext'
import { AiOutlineArrowLeft } from 'react-icons/ai'

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

const SinglePokemon = () => {
  //bring the selected pokemon
  const { selectedPokemon } = useContext(PokeContext)
  const navigate = useNavigate()

  return (
    <div id='single-pokemon'>
      <button id='back-btn'
      onClick={() => navigate('/')}>
        <AiOutlineArrowLeft/>
      </button>
      <h2 className='single-pokemon-name'>{selectedPokemon.name}</h2>
      <p className='single-pokemon-num'>{selectedPokemon.number}</p>
      <img className='single-main-img' src={selectedPokemon.imageURL} alt={selectedPokemon.name} style={{backgroundColor: typeColors[selectedPokemon.types[0].toLowerCase()]}}/>
      <div id='single-sub-img'>
        <img className='single-vivid-img' src={selectedPokemon.vividImage} alt={selectedPokemon.name}/>
        <img className='single-side-img' src={selectedPokemon.frontImage} alt={selectedPokemon.name}/>
        <img className='single-side-img' src={selectedPokemon.backImage} alt={selectedPokemon.name}/>
      </div>
      <div id='single-description'>
        <p>Type: {selectedPokemon.types.join(", ")}</p>
        <p>Ability: {selectedPokemon.ability.join(", ")}</p>
        <p>Height: {selectedPokemon.height}</p>
        <p>Weight: {selectedPokemon.weight}</p>
      </div>
    </div>
  )
}

export default SinglePokemon
