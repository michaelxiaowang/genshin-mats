import React from 'react';
import "./CharactersPage.css";

let characterLevels = [6,5,4,3,2,1] // reversed order because rotateY done in css due to nature of css selectors

class CharactersPage extends React.Component {
  constructor(props) {
    super(props);
    this.toggleCharacter = this.toggleCharacter.bind(this);
    this.setCharacterStage = this.setCharacterStage.bind(this);
  }

  toggleCharacter(character) {
    this.props.toggleCharacter(character);
  }

  setCharacterStage(character, stage) {
    this.props.setCharacterStage(character, stage);
  }

  selected(character) {
    return this.props.state.hasOwnProperty(character) && this.props.state[character].stage !== -1;
  }

  isLevel(character, level) {
    return this.selected(character) && this.props.state[character]['stage'] === level;
  }

  render() {
    return (
      <div className="character-list">
          {
            Object.values(this.props.characters).map(character => (
              <div key={character.name} className="character-portrait">
                <img
                  className={"character-icon " + (this.selected(character.name) ? '' : 'inactive')}
                  src={process.env.PUBLIC_URL + '/images/characters/' + character.name + '.png'}
                  alt={character.name}
                  onClick={(e) => this.toggleCharacter(character.name, e)}/>
                <img
                  className={"character-type " + (this.selected(character.name) ? '' : 'inactive')}
                  src={process.env.PUBLIC_URL + '/images/' + character.type + '.png'}
                  alt={character.type}/>
                <div className="star-level">
                  {
                    characterLevels.map(level => (
                      <React.Fragment key={level}>
                        <input
                          id={character.name + "" + level}
                          type="radio"
                          name={character.name}
                          value={level}
                          disabled={!this.selected(character.name)}
                          checked={this.isLevel(character.name, level)}
                          onChange={(e) => this.setCharacterStage(character.name, level, e)}/>
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
}

export default CharactersPage