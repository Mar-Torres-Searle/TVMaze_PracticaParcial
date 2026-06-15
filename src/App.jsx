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

  const [busquedaFavoritos, setBusquedaFavoritos] = useState('')
  const [generoSeleccionado, setGeneroSeleccionado] = useState('Todos')

  const generos = ['Todos', ...new Set(favoritos.flatMap(s => s.genres))]


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
          <button className={pestanaActiva === 'favoritos' ? 'nav-btn activo' : 'nav-btn'}onClick={() => setPestanaActiva('favoritos')}> Favoritos {favoritos.length > 0 && `(${favoritos.length})`}</button>
        </nav>
      </header>

      {pestanaActiva === 'buscar' && (
        <main className="contenedor"> 

          <div className="hero">
            <h2>Descubre tu próxima serie favorita</h2>
            <p>Busca entre miles de series y guarda tus favoritas</p>
            <Buscador onBuscar={handleBuscar} />
          </div>

          {series.length > 0 && <h2 className="seccion-titulo">Resultados de búsqueda</h2>}
          
          <ListaSeries series={series} onSeleccionar={handleSeleccionar} />
          
          {favoritos.length > 0 && (
            <div className="favoritos-home">
              <h2 className="seccion-titulo">Mis favoritos</h2>
              <Favoritos favoritos={favoritos} onSeleccionar={handleSeleccionar} />
            </div>
          )}

        </main>
      )}

      {pestanaActiva === 'favoritos' && (
        <main className="contenedor">

          <div className="hero">
            <h2>Mis series favoritas</h2>
            <p>Todas las series que has guardado en un solo lugar</p>
            <input
              type="text"
              placeholder="Buscar en favoritos..."
              value={busquedaFavoritos}
              onChange={(e) => setBusquedaFavoritos(e.target.value)}
              className="buscador-input"
            />
            <div className="generos-lista">
              {generos.map(genero => (
                <button
                  key={genero}
                  className={generoSeleccionado === genero ? 'genero-btn activo' : 'genero-btn'}
                  onClick={() => setGeneroSeleccionado(genero)}
                >
                  {genero}
                </button>
              ))}
            </div>
          </div>

          <div className="contenedor">
            <Favoritos favoritos={favoritos} onSeleccionar={handleSeleccionar} busqueda={busquedaFavoritos} generoSeleccionado={generoSeleccionado}/>
          </div>

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
