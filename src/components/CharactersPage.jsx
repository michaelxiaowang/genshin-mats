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
                    <React.Fragment key={level}>
                      <input type="radio" name={character.name} value={level} id={character.name + "" + level}></input>
                      <label htmlFor={character.name + "" + level}></label>
                    </React.Fragment>
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