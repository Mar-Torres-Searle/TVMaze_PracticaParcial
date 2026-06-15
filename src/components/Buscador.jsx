import { useState } from 'react'

function Buscador({ onBuscar }) {
  const [texto, setTexto] = useState('')

  function handleSubmit() {
    if (texto.trim() !== '') {
      onBuscar(texto)
    }
  }

  return (
    <div className="buscador">
      <input
        type="text"
        placeholder="Busca una serie..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <button onClick={handleSubmit}>Buscar</button>
    </div>
  )
}

export default Buscador