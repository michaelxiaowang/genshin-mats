import React from 'react';
import { NavLink } from "react-router-dom";
import "./CharactersPage.css";

let characterLevels = [6,5,4,3,2,1]; // reversed order because rotateY done in css due to nature of css selectors
let elementList = ['anemo', 'cryo', 'electro', 'dendro', 'geo', 'hydro', 'pyro'];
let weaponList = ['bow', 'catalyst', 'claymore', 'polearm', 'sword'];

class CharactersPage extends React.Component {

  constructor(props) {
    super(props);
    this.toggleCharacter = this.toggleCharacter.bind(this);
    this.setCharacterStage = this.setCharacterStage.bind(this);
    this.state = { elementFilters: [...elementList], weaponFilters: [...weaponList] };
  }

  toggleCharacter(character) {
    this.props.toggleCharacter(character);
  }

  setCharacterStage(character, stage) {
    this.props.setCharacterStage(character, stage);
  }

  toggleElement(element) {
    let elementFilters = this.state.elementFilters;
    elementFilters = elementFilters.includes(element) ? elementFilters.filter(item => item !== element) : [element, ...elementFilters];
    this.setState({elementFilters});
  }

  toggleWeapon(weapon) {
    let weaponFilters = this.state.weaponFilters;
    weaponFilters = weaponFilters.includes(weapon) ? weaponFilters.filter(item => item !== weapon) : [weapon, ...weaponFilters];
    this.setState({weaponFilters});
  }

  selected(character) {
    return this.props.state.hasOwnProperty(character) && this.props.state[character].stage !== -1;
  }

  isLevel(character, level) {
    return this.selected(character) && this.props.state[character]['stage'] === level;
  }

  render() {
    return (
      <div>
        <div className="filters">
          <ul className="element-filters">
            {
              elementList.map(element => (
                <li key={element}>
                  <button className={"filter " + (this.state.elementFilters.includes(element) ? 'active' : '')} onClick={() => this.toggleElement(element)}>
                    <img className="filter-image" src={process.env.PUBLIC_URL + '/images/' + element + '.png'} alt={element}/>
                  </button>
                </li>
              ))
            }
          </ul>
          <ul className="weapon-filters">
            {
              weaponList.map(weapon => (
                <li key={weapon}>
                  <button className={"filter " + (this.state.weaponFilters.includes(weapon) ? 'active' : '')} onClick={() => this.toggleWeapon(weapon)}>
                    <img className="filter-image" src={process.env.PUBLIC_URL + '/images/' + weapon + '.png'} alt={weapon}/>
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="character-list">
            {
              Object.values(this.props.characters)
                .filter(character => ['flex', ...this.state.elementFilters].includes(character.type) && this.state.weaponFilters.includes(character.weapon))
                .map(character => (
                  <div key={character.name} className="character-portrait">
                    <img
                      className={"character-icon " + (this.selected(character.name) ? '' : 'inactive')}
                      src={process.env.PUBLIC_URL + '/images/characters/' + character.name + '.png'}
                      alt={character.name}
                      onClick={(e) => this.toggleCharacter(character.name, e)}/>
                    {
                      character.name !== 'Traveler' &&
                      <img
                        className={"character-type " + (this.selected(character.name) ? '' : 'inactive')}
                        src={process.env.PUBLIC_URL + '/images/' + character.type + '.png'}
                        alt={character.type}/>
                    }
                    <div className="star-level">
                      {
                        characterLevels.map(level => (
                          <React.Fragment key={level}>
                            <input
                              id={`${character.name}${level}`}
                              type="radio"
                              name={character.name}
                              value={level}
                              disabled={!this.selected(character.name)}
                              checked={this.isLevel(character.name, level)}
                              onChange={(e) => this.setCharacterStage(character.name, level, e)}/>
                            <label htmlFor={`${character.name}${level}`}></label>
                          </React.Fragment>
                        ))
                      }
                    </div>
                    <NavLink to={`/Characters/${character.name}`} className="character-name">{character.name}</NavLink>
                  </div>
                ))
            }
        </div>
      </div>
    )
  }
}

export default CharactersPage