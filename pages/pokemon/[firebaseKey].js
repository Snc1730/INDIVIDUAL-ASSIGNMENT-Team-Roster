/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getPokemonDetails } from '../../api/mergedData';

export default function ViewPokemon() {
  const [pokemonDetails, setPokemonDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    getPokemonDetails(firebaseKey).then(setPokemonDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={pokemonDetails.image} alt={pokemonDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {pokemonDetails.name}
          {pokemonDetails.teamObject?.favorite ? ' 🤍' : ''}
        </h5>
        <p>{pokemonDetails.description || ''}</p>
        <hr />
      </div>
    </div>
  );
}
