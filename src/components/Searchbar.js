import React, { useState } from 'react';
import './searchbar.css';

function Searchbar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <>
            <h3 className='titulo'>
                Escoge tus pokemones
            </h3>
            <section className='container-buscar'>
                <input
                    type="text"
                    placeholder='Busca algún pokemon'
                    className='input-buscar'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className='btn-buscar' onClick={handleSearch}>
                    Buscar pokemon
                </button>
            </section>
        </>
    );
}

export default Searchbar;
