function DetallePokemon(mostrar, pokemon, cerrar) {

    return (
        <div className="modal-container" onClick={cerrar} style={{ display: mostrar ? 'grid' : 'none' }}>
            <h1>
                Detalle
            </h1>
        </div>
    )
}

export default DetallePokemon