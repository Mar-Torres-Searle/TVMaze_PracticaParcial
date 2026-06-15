import TarjetaSerie from './TarjetaSerie'

function ListaSeries({ series, onSeleccionar, onFavorito, favoritos }) {
  if (series.length === 0) {
    return null
  }

  return (
    <section className="lista-series">
      {series.map((resultado) => (
        <TarjetaSerie
          key={resultado.show.id}
          serie={resultado.show}
          onSeleccionar={onSeleccionar}
          onFavorito={onFavorito}
          esFavorito={favoritos.some(f => f.id === resultado.show.id)}
        />
      ))}
    </section>
  )
}

export default ListaSeries