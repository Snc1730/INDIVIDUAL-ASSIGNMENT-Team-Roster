/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getPokemon } from '../api/pokemonData';
import PokemonCard from '../components/PokemonCard';

function Home() {
  const [pokemons, setPokemons] = useState([]);

  const { user } = useAuth();

  const getAllThePokemon = () => {
    getPokemon(user.uid).then(setPokemons);
  };

  useEffect(() => {
    getAllThePokemon();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/pokemon/new" passHref>
        <Button>Add A Pokemon</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* TODO: map over pokemon here using PokemonCard component */}
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.firebaseKey} pokemonObj={pokemon} onUpdate={getAllThePokemon} />
        ))}
      </div>

    </div>
  );
}

export default Home;
