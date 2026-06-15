import { useState, useEffect } from 'react'

function DetalleSerie({ serie, onCerrar, onFavorito, esFavorito }) {

    const [cast, setCast] = useState([])

    useEffect(() => {
      fetch(`https://api.tvmaze.com/shows/${serie.id}/cast`)
        .then(res => res.json())
        .then(data => setCast(data.slice(0, 6)))
    }, [serie.id])

    return (
      <div className="overlay" onClick={onCerrar}>
        <div className="contenido" onClick={(e) => e.stopPropagation()}>
            <button className="cerrar" onClick={onCerrar}>✕</button>
            <div className="info-importante">
                <div className="image-container">
                    <img
                        src={serie.image ? serie.image.medium : 'https://via.placeholder.com/210x295?text=Sin+imagen'}
                        alt={serie.name}
                    />
                    <button className={esFavorito ? 'btn-favorito activo' : 'btn-favorito'} onClick={() => onFavorito(serie)}>
                        {esFavorito ? '✕ Eliminar' : '♡ Favorito'}
                    </button>
                </div>

                <div className="header-info">
                    <h2>{serie.name}</h2>
                    <p><strong>Género:</strong> {serie.genres.join(', ')}</p>
                    <p><strong>Estado:</strong> {serie.status}</p>
                    <p><strong>Estreno:</strong> {serie.premiered}</p>
                    {serie.rating.average && (<p><strong>Rating:</strong> ⭐ {serie.rating.average}</p>)}
                    <p><strong>Idioma:</strong> {serie.language}</p>
                    {serie.network && (<p><strong>Cadena:</strong> {serie.network.name}</p>)}
                    {serie.runtime && (<p><strong>Duración:</strong> {serie.runtime} min por episodio</p>)}
                </div>
            </div>

            <div className="descripcion">
                <h3>Descripción:</h3>
                <div dangerouslySetInnerHTML={{ __html: serie.summary }} />
            </div>  

            {cast.length > 0 && (
                <div className="cast">
                    <h3>Reparto</h3>
                    <div className="cast-list">
                    {cast.map((miembro) => (
                        <div key={miembro.person.id} className="cast-list-item">
                        <img
                            src={miembro.person.image ? miembro.person.image.medium : 'https://via.placeholder.com/100x100?text=?'}
                            alt={miembro.person.name}
                        />
                        <p className="cast-list-item-name">{miembro.person.name}</p>
                        <p className="cast-list-item-character">{miembro.character.name}</p>
                        </div>
                    ))}
                    </div>
                </div>
            )}
        </div>
      </div>
    )
  }
  
  export default DetalleSerie