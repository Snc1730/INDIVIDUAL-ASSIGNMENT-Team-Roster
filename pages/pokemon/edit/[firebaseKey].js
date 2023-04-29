import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePokemon } from '../../../api/pokemonData';
import PokemonForm from '../../../components/forms/PokemonForm';

export default function EditPokemon() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { firebaseKey } = router.query;

  // TODO: make a call to the API to get the pokemon data
  useEffect(() => {
    getSinglePokemon(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  // TODO: pass object to form
  return (<PokemonForm obj={editItem} />);
}
