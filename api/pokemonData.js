import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET POKEMON
const getPokemon = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pokemon.json?orderBy="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// DELETE POKEMON
const deletePokemon = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pokemon/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// GET SINGLE POKEMON
const getSinglePokemon = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pokemon/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }, // you technically do not need the options object for GET requests, but using it here for consistency
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

// CREATE POKEMON
const createPokemon = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pokemon.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// UPDATE POKEMON
const updatePokemon = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pokemon/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// FILTER FAVORITE POKEMON
const favoritePokemon = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/pokemon.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const onSale = Object.values(data).filter((item) => item.sale);
      resolve(onSale);
    })
    .catch(reject);
});

export {
  getPokemon,
  createPokemon,
  favoritePokemon,
  deletePokemon,
  getSinglePokemon,
  updatePokemon,
};
