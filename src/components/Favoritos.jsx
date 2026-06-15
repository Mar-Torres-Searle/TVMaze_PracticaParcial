import { useState } from 'react'
import TarjetaSerie from './TarjetaSerie'

function Favoritos({ favoritos, onSeleccionar, busqueda = '', generoSeleccionado = 'Todos'  }) {


    if (favoritos.length === 0 && conFiltros) {
        return (
            <div className="favoritos-vacio">
              <span>🎬</span>
              <p>Aún no tienes series favoritas</p>
              <p>Busca una serie y añádela a favoritos</p>
            </div>
          )
    }

    const favoritosFiltrados = favoritos.filter(serie => {
        const coincideNombre = serie.name.toLowerCase().includes(busqueda.toLowerCase())
        const coincideGenero = generoSeleccionado === 'Todos' || serie.genres.includes(generoSeleccionado)
        return coincideNombre && coincideGenero
    })

    console.log('busqueda:', busqueda, 'genero:', generoSeleccionado)
    
    return (
        <section className="favoritos">
            {favoritosFiltrados.length === 0 ? (
                <p className="sin-resultados">No hay series que coincidan con tu búsqueda</p>
            ) : (
                <div className="lista-series">
                {favoritosFiltrados.map((serie) => (
                    <TarjetaSerie
                    key={serie.id}
                    serie={serie}
                    onSeleccionar={onSeleccionar}
                    />
                ))}
                </div>
            )}
        </section>
    )
  }
  
  export default Favoritos