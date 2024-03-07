import './searchbar.css'

function Searchbar() {

    return (
        <>
            <h3 className='titulo'>
                Escoge tus pokemones
            </h3>
            <section className='container-buscar'>
                <input type="text" placeholder='Busca algún pokemon' className='input-buscar' />
                <button className='btn-buscar'>
                    Buscar pokemon
                </button>
            </section>
        </>
    )
}

export default Searchbar;