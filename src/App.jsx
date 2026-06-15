import { useState } from 'react'
import './App.css'
import Buscador from './components/Buscador'
import ListaSeries from './components/ListaSeries'
import DetalleSerie from './components/DetalleSerie'
import Favoritos from './components/Favoritos'

function App() {


  function handleBuscar(texto) {
    console.log('Buscando:', texto)
  }

  return (
    <div className="App">
      <h1>TVMaze</h1>
      <Buscador onBuscar={handleBuscar}/>
      <ListaSeries />
      <DetalleSerie />
      <Favoritos />
    </div>
  )
}

export default App
