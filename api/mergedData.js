import { deletePokemon, getSinglePokemon } from './pokemonData';
import { deleteSingleTeam, getSingleTeam, getTeamPokemon } from './teamData';

// GET DATA FOR VIEW POKEMON
const getPokemonDetails = (firebaseKey) => new Promise((resolve, reject) => {
  // GET SINGLE POKEMON
  getSinglePokemon(firebaseKey).then((pokemonObject) => { // returns single book object
    getSingleTeam(pokemonObject.team_id) // we nest this promise so that we can use the book object
      .then((teamObject) => resolve({ ...pokemonObject, teamObject }));
  }).catch(reject);
  // GET TEAM
  // Create an object that has POKEMON data and an object named teamObject
});

const deleteTeamPokemonRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getTeamPokemon(firebaseKey).then((teamPokemonArray) => {
    const deletePokemonPromises = teamPokemonArray.map((pokemon) => deletePokemon(pokemon.firebaseKey));

    Promise.all(deletePokemonPromises).then(() => {
      deleteSingleTeam(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export {
  getPokemonDetails,
  deleteTeamPokemonRelationship,
};
