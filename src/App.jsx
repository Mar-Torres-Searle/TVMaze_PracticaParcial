import { useState } from 'react'
import './App.css'
import Buscador from './components/Buscador'
import ListaSeries from './components/ListaSeries'
import DetalleSerie from './components/DetalleSerie'
import Favoritos from './components/Favoritos'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>TVMaze</h1>
      <Buscador />
      <ListaSeries />
      <DetalleSerie />
      <Favoritos />
    </div>
  )
}

export default App
