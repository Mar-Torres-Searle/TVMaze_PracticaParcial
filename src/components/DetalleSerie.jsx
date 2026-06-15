function DetalleSerie({ serie, onCerrar, onFavorito, esFavorito }) {

    
    return (
      <div className="overlay" onClick={onCerrar}>
        <div className="contenido" onClick={(e) => e.stopPropagation()}>
            <button className="cerrar" onClick={onCerrar}>✕</button>
            <div className="imagen">
                <img
                    src={serie.image ? serie.image.medium : 'https://via.placeholder.com/210x295?text=Sin+imagen'}
                    alt={serie.name}
                />
                <div className="header-info">
                    <h2>{serie.name}</h2>
                    <hr className="separador" />
                    <p><strong>Género:</strong> {serie.genres.join(', ')}</p>
                    <p><strong>Estado:</strong> {serie.status}</p>
                    <p><strong>Estreno:</strong> {serie.premiered}</p>
                    {serie.rating.average && (<p><strong>Rating:</strong> ⭐ {serie.rating.average}</p>)}
                    <button className={esFavorito ? 'btn-favorito activo' : 'btn-favorito'} onClick={() => onFavorito(serie)}>
                        {esFavorito ? '❤️ Quitar de favoritos' : '🤍 Añadir a favoritos'}
                    </button>
                </div>
            </div>

            <div className="descripcion">
                <h3>Descripción:</h3>
                <div dangerouslySetInnerHTML={{ __html: serie.summary }} />
            </div>  

            <div className="mas-info">
                <h3>Más información</h3>
                <p><strong>Idioma:</strong> {serie.language}</p>
                {serie.network && (<p><strong>Cadena:</strong> {serie.network.name}</p>)}
                {serie.runtime && (<p><strong>Duración:</strong> {serie.runtime} min por episodio</p>)}
            </div>
        </div>
      </div>
    )
  }
  
  export default DetalleSerie