function TarjetaSerie({ serie, onSeleccionar }) {
    return (
      <div className="tarjeta-serie" onClick={() => onSeleccionar(serie.id)}>
        <img
          src={serie.image ? serie.image.medium : 'https://via.placeholder.com/210x295?text=Sin+imagen'}
          alt={serie.name}
        />
        <p>{serie.name}</p>
      </div>
    )
  }
  
  export default TarjetaSerie