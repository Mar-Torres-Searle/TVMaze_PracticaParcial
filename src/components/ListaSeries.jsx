import TarjetaSerie from './TarjetaSerie'

function ListaSeries({ series }) {
  if (series.length === 0) {
    return null
  }

  return (
    <section className="lista-series">
      {series.map((resultado) => (
        <TarjetaSerie
          key={resultado.show.id}
          serie={resultado.show}
        />
      ))}
    </section>
  )
}

export default ListaSeries