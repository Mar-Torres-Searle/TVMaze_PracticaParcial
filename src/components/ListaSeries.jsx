import TarjetaSerie from './TarjetaSerie'

function ListaSeries({ series, onSeleccionar }) {
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
        />
      ))}
    </section>
  )
}

export default ListaSeries