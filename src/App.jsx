import { useState } from 'react'
import './App.css'
import Buscador from './components/Buscador'
import ListaSeries from './components/ListaSeries'
import DetalleSerie from './components/DetalleSerie'
import Favoritos from './components/Favoritos'

function App() {

  const [series, setSeries] = useState([])
  const [serieSeleccionada, setSerieSeleccionada] = useState(null)


  function handleBuscar(texto) {
    console.log('Buscando:', texto)
    fetch(`https://api.tvmaze.com/search/shows?q=${texto}`)
      .then(res => res.json())
      .then(data => setSeries(data))
      .catch(error => console.error('Error:', error))
  }
  
  function handleSeleccionar(id) {
    console.log('Seleccionando:', id)
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then(res => res.json())
      .then(data => setSerieSeleccionada(data))
  }

  function handleCerrar() {
    setSerieSeleccionada(null)
  }

  console.log('Serie seleccionada:', serieSeleccionada)
  return (
    <div className="App">
      <h1>TVMaze</h1>
      <Buscador onBuscar={handleBuscar}/>
      <ListaSeries series={series} onSeleccionar={handleSeleccionar}/>
      {serieSeleccionada && (<DetalleSerie serie={serieSeleccionada} onCerrar={handleCerrar}/>)}
      <Favoritos />
    </div>
  )
}

export default App
