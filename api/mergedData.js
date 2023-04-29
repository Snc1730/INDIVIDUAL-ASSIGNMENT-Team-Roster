import { deletePokemon, getSinglePokemon } from './pokemonData';
import { deleteSingleTeam, getSingleTeam, getTeamPokemon } from './teamData';

// GET DATA FOR VIEW POKEMON
const getPokemonDetails = (pokemonFirebaseKey) => new Promise((resolve, reject) => {
  getSinglePokemon(pokemonFirebaseKey)
    .then((pokemonObject) => {
      getSingleTeam(pokemonObject.team_id)
        .then((teamObject) => {
          resolve({ teamObject, ...pokemonObject });
        });
    }).catch((error) => reject(error));
});

const viewTeamDetails = (teamFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamFirebaseKey), getTeamPokemon(teamFirebaseKey)])
    .then(([teamObject, teamPokemonArray]) => {
      resolve({ ...teamObject, pokemon: teamPokemonArray });
    }).catch((error) => reject(error));
});

const deleteTeamPokemonRelationship = (teamId) => new Promise((resolve, reject) => {
  getTeamPokemon(teamId).then((pokemonArray) => {
    console.warn(pokemonArray, 'Team Pokemon');
    const deletePokemonPromises = pokemonArray.map((pokemon) => deletePokemon(pokemon.firebaseKey));

    Promise.all(deletePokemonPromises).then(() => {
      deleteSingleTeam(teamId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export {
  getPokemonDetails,
  viewTeamDetails,
  deleteTeamPokemonRelationship,
};
