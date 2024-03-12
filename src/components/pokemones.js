import React, { useEffect, useState } from 'react';
import './Pokemones.css';
import DetallePokemon from './DetallePokemon';

function Pokemon({ id, nombre, tipo, imagen, verPokemon }) { // Define el componente Pokemon aquí
    return (
        <div className='pokemon-card' onClick={verPokemon}>
            <img src={imagen} alt={nombre} className='pokemon-imagen' />
            <p className='pokemon-titulo'>
                <span>#{id}</span>
                <span>{nombre}</span>
            </p>
            <p className='pokemon-tipo'>
                <span>{tipo}</span>
            </p>
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
