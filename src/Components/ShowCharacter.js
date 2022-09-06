import React from 'react'

export default function ShowCharacter(props) {
  return (
    <div className='row'>
        {props.characters.data.results.map(character => ( 
          <div className="card col s4 hoverable blue-grey darken-3 " key={character.id}>
            <div className="card-image waves-effect waves-block waves-light">
              <img className="activator" src={character.image} />
            </div>
            <div className="card-content">
              <span className="card-title activator blue-grey-text text-lighten-4 left-align"> <b>{character.name}</b> <i className='right-align'>Ver mas...</i></span>
              <p className='grey-text lighten-2 left-align'> <b className='pink-text darken-4'>Living location:</b><br/> {character.location.name} </p>
            </div>
            <div className="card-reveal  pink darken-3">
              <span className="card-title grey-text text-lighten-3 "><b>{character.name}</b><i className="material-icons right">close</i></span>
              <p className='grey-text text-lighten-3 left-align MT'><b>Gender:</b> {character.gender}</p>
              <p className='grey-text text-lighten-3 left-align'><b>Location:</b> {character.location.name}</p>
              <p className='grey-text text-lighten-3 left-align'><b>Origin:</b> {character.origin.name}</p>
              <p className='grey-text text-lighten-3 left-align'><b>Specie:</b> {character.species}</p>
              <p className='grey-text text-lighten-3 left-align'><b>Status:</b> {character.status}</p>
            </div>
         </div>
        )) }
    </div>
  )
}
