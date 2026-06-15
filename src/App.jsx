import { useState } from 'react'
import './App.css'
import Buscador from './components/Buscador'
import ListaSeries from './components/ListaSeries'
import DetalleSerie from './components/DetalleSerie'
import Favoritos from './components/Favoritos'

function App() {

  const [series, setSeries] = useState([])
  const [serieSeleccionada, setSerieSeleccionada] = useState(null)
  const [favoritos, setFavoritos] = useState(() => {
    const guardados = localStorage.getItem('favoritos')
    return guardados ? JSON.parse(guardados) : []
  })


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
  function handleFavorito(serie) {
    const esFavorito = favoritos.some(f => f.id === serie.id)
    let nuevosFavoritos

    if (esFavorito) {
      nuevosFavoritos = favoritos.filter(f => f.id !== serie.id)
    } else {
      nuevosFavoritos = [...favoritos, serie]
    }

    setFavoritos(nuevosFavoritos)
    localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos))
  }

  const [pestanaActiva, setPestanaActiva] = useState('buscar')

  console.log('Serie seleccionada:', serieSeleccionada)
  return (
    <div className="App">
      <header className="header">
        <h1>TVMaze</h1>
        <nav className="nav">
          <button className={pestanaActiva === 'buscar' ? 'nav-btn activo' : 'nav-btn'} onClick={() => setPestanaActiva('buscar')}> Buscar</button>
          <button className={pestanaActiva === 'favoritos' ? 'nav-btn activo' : 'nav-btn'}onClick={() => setPestanaActiva('favoritos')}> ❤️ Favoritos {favoritos.length > 0 && `(${favoritos.length})`}</button>
        </nav>
      </header>
      {pestanaActiva === 'buscar' && (
        <main className="contenedor"> 
          <Buscador onBuscar={handleBuscar} />
          <ListaSeries series={series} onSeleccionar={handleSeleccionar} />
        </main>
      )}
      {pestanaActiva === 'favoritos' && (
        <main className="contenedor">
          <Favoritos favoritos={favoritos} onSeleccionar={handleSeleccionar}/>
        </main>
      )}
      {serieSeleccionada && (
        <DetalleSerie
          serie={serieSeleccionada}
          onCerrar={handleCerrar}
          onFavorito={handleFavorito}
          esFavorito={favoritos.some(f => f.id === serieSeleccionada.id)}
        />
      )}
    </div>
  )
}

export default App
