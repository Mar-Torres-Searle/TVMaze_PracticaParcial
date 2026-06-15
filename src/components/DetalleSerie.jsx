function DetalleSerie({ serie, onCerrar }) {
    return (
      <div className="overlay" onClick={onCerrar}>
        <div className="contenido" onClick={(e) => e.stopPropagation()}>
          <button className="cerrar" onClick={onCerrar}>✕</button>
          <img
            src={serie.image ? serie.image.medium : 'https://via.placeholder.com/210x295?text=Sin+imagen'}
            alt={serie.name}
          />
          <div className="informacion">
            <h2>{serie.name}</h2>
            <p><strong>Género:</strong> {serie.genres.join(', ')}</p>
            <p><strong>Estado:</strong> {serie.status}</p>
            <p><strong>Estreno:</strong> {serie.premiered}</p>
            {serie.rating.average && (
              <p><strong>Rating:</strong> {serie.rating.average}</p>
            )}
            <div dangerouslySetInnerHTML={{ __html: serie.summary }} />
          </div>
        </div>
      </div>
    )
  }
  
  export default DetalleSerie