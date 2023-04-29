/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewTeamDetails } from '../../api/mergedData';
import PokemonCard from '../../components/PokemonCard';

export default function ViewTeam() {
  const [teamDetails, setTeamDetails] = useState({});
  const router = useRouter();

  // TODO: grab firebaseKey from url
  const { firebaseKey } = router.query;

  // TODO: make call to API layer to get the data
  useEffect(() => {
    viewTeamDetails(firebaseKey).then(setTeamDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={teamDetails.image} alt={teamDetails.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {teamDetails.team_name}
          {teamDetails.teamObject?.favorite ? ' 🤍' : ''}
        </h5>
        <h5>
          {teamDetails.description}
        </h5>
        <hr />
      </div>
      <div className="d-flex flex-wrap">
        {teamDetails.pokemon?.map((pokemon) => (
          <PokemonCard key={pokemon.firebaseKey} pokemonObj={pokemon} onUpdate={viewTeamDetails} />
        ))}
      </div>
    </div>
  );
}
