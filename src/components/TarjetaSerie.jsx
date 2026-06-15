function TarjetaSerie({ serie }) {
    return (
      <div className="tarjeta-serie">
        <img
          src={serie.image ? serie.image.medium : 'https://via.placeholder.com/210x295?text=Sin+imagen'}
          alt={serie.name}
        />
        <p>{serie.name}</p>
      </div>
    )
  }
  
  export default TarjetaSerie