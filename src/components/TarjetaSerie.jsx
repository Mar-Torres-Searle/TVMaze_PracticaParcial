function TarjetaSerie({ serie, onSeleccionar, onFavorito, esFavorito }) {
    return (
      <div className="tarjeta-serie" onClick={() => onSeleccionar(serie.id)}>
        <img
          src={serie.image ? serie.image.medium : 'https://via.placeholder.com/210x295?text=Sin+imagen'}
          alt={serie.name}
        />

        <button
            className={esFavorito ? 'btn-fav-rapido activo' : 'btn-fav-rapido'}
            onClick={(e) => {
            e.stopPropagation()
            onFavorito(serie)
            }}
        >
            ♡
        </button>

        <p>{serie.name}</p>
      </div>
    )
  }
  
  export default TarjetaSerie