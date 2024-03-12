import React, { useState, useEffect } from 'react';
import './Pokemones.css';
import DetallePokemon from './DetallePokemon';

function Pokemon({ id, nombre, tipo, imagen, verPokemon, detalles }) {
    const [mostrarDetalles, setMostrarDetalles] = useState(false);

    const toggleDetalles = () => {
        setMostrarDetalles(!mostrarDetalles);
    };

    return (
        <div className='pokemon-card'>
            <img src={imagen} alt={nombre} className='pokemon-imagen' />
            <p className='pokemon-titulo'>
                <span>#{id}</span>
                <span>{nombre}</span>
            </p>
            <p className='pokemon-tipo'>
                <span>{tipo}</span>
            </p>
            <button onClick={toggleDetalles}>
                {mostrarDetalles ? "Ocultar detalles" : "Mostrar detalles"}
            </button>
            <div className={`overlay ${mostrarDetalles ? 'active' : ''}`} onClick={toggleDetalles}></div>
            <div className={`detalles-container ${mostrarDetalles ? 'active' : ''}`}>
                <h3>Detalles del Pokémon</h3>
                <p>{detalles}</p>
            </div>
        </div>
    )
}

function Pokemones({ searchTerm }) {
    const [pokemones, setPokemones] = useState([]);
    const [mostrar, setMostrar] = useState({ mostrar: false, pokemon: {} });

    const verPokemon = (pokemon) => setMostrar({ mostrar: true, pokemon });
    const noVerPokemon = () => setMostrar({ mostrar: false, pokemon: {} });

    useEffect(() => {
        const getPokemones = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
                const listaPokemones = await response.json();
                const { results } = listaPokemones;
                const newPokemones = await Promise.all(results.map(async (pokemon) => {
                    const response = await fetch(pokemon.url);
                    const poke = await response.json();
                    return {
                        id: poke.id,
                        nombre: poke.name,
                        tipo: poke.types[0].type.name,
                        imagen: poke.sprites.other.dream_world.front_default,
                        detalles: `Altura: ${poke.height}, Peso: ${poke.weight}, Stats: ${poke.stats[1].stat.name} ${poke.stats[2].stat.name}`
                    };
                }));
                setPokemones(newPokemones);
            } catch (error) {
                console.error('Error fetching Pokemon:', error);
            }
        };
        getPokemones();
    }, []);

    const filteredPokemones = pokemones.filter((pokemon) =>
        pokemon.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <DetallePokemon {...mostrar} cerrar={noVerPokemon} />
            <section className='pokemon-container'>
                {filteredPokemones.map((pokemon) => (
                    <Pokemon key={pokemon.id} {...pokemon} verPokemon={() => verPokemon(pokemon)} />
                ))}
            </section>
        </>
    );
}

export default Pokemones;
