import TarjetaSerie from './TarjetaSerie'

function Favoritos({ favoritos, onSeleccionar }) {
    if (favoritos.length === 0) {
        return null
    }
    
    return (
        <section className="favoritos">
            <h2>Mis favoritos</h2>
            <div className="lista-series">
            {favoritos.map((serie) => (
                <TarjetaSerie
                key={serie.id}
                serie={serie}
                onSeleccionar={onSeleccionar}
                />
            ))}
            </div>
        </section>
    )
  }
  
  export default Favoritos