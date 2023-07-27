import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import {PokeContextProvider} from './context/PokeContext'

//import of pages 
import Homepage from './pages/Homepage'
//import of components
import Header from './components/Header'
import Footer from './components/Footer'
import SinglePokemon from './components/SinglePokemon'


function App() {

  return (
    <HashRouter>
      <PokeContextProvider>
        <Header/>
        <Routes>
        <Route exact path='/' element={<Homepage/>} />
        <Route path='/pokemon/' element={<SinglePokemon/>}/>
        </Routes>
        <Footer/>
      </PokeContextProvider>
    </HashRouter>
  )
}

export default App
