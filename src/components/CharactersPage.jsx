import React from 'react';
import "./CharactersPage.css";

let characterLevels = [1,2,3,4,5,6]

function CharactersPage(props) {
    return (
    <div className="character-list">
        {
          Object.values(props.characters).map(character => (
            <div key={character.name} className="character-portrait">
              <img className="character-icon" src={process.env.PUBLIC_URL + '/images/characters/' + character.name + '.png'} alt={character.name}/>
              <div className="star-level">
                {
                  characterLevels.map(level => (
                    <img className="star" key={level} src={process.env.PUBLIC_URL + '/images/star.png'}/>
                  ))
                }
              </div>
              <label className="character-name">{character.name}</label>
            </div>
          ))
        }
    </div>
    )
}

export default CharactersPage