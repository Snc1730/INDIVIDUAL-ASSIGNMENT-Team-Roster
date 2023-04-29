import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deletePokemon } from '../api/pokemonData';

function PokemonCard({ pokemonObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE pokemon AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThisPokemon = () => {
    if (window.confirm(`Delete ${pokemonObj.name}?`)) {
      deletePokemon(pokemonObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={pokemonObj.image} alt={pokemonObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{pokemonObj.name}</Card.Title>
        <p className="card-text bold">{pokemonObj.favorite && <span>FAVORITE<br /></span> } {pokemonObj.type}</p>
        {/* DYNAMIC LINK TO VIEW THE POKEMON DETAILS  */}
        <Link href={`/pokemon/${pokemonObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE POKEMON DETAILS  */}
        <Link href={`/pokemon/edit/${pokemonObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisPokemon} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

PokemonCard.propTypes = {
  pokemonObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    favorite: PropTypes.bool,
    type: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default PokemonCard;
