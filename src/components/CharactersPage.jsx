import React from 'react';
import { NavLink } from "react-router-dom";
import StarLevel from './StarLevel';
import "./CharactersPage.css";

let elementList = ['anemo', 'cryo', 'electro', 'dendro', 'geo', 'hydro', 'pyro'];
let weaponList = ['bow', 'catalyst', 'claymore', 'polearm', 'sword'];

class CharactersPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { elementFilters: [...elementList], weaponFilters: [...weaponList] };
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

  render() {
    return (
      <React.Fragment>
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
              Object.entries(this.props.characters)
                .filter(([key, value]) => ['flex', ...this.state.elementFilters].includes(value.type) && this.state.weaponFilters.includes(value.weapon))
                .map(([key, value]) => (
                  <div key={key} className="character-portrait">
                    <img
                      className={"character-icon " + (this.props.selected(key) ? '' : 'inactive')}
                      src={process.env.PUBLIC_URL + '/images/characters/' + value.name + '.png'}
                      alt={value.name}
                      onClick={(e) => this.props.toggleCharacter(key, e)}/>
                    {
                      key !== 'traveler' &&
                      <img
                        className={"character-type " + (this.props.selected(key) ? '' : 'inactive')}
                        src={process.env.PUBLIC_URL + '/images/' + value.type + '.png'}
                        alt={value.type}/>
                    }
                    <StarLevel
                      name={key}
                      level={this.props.getCharacterStage(key)}
                      disabled={!this.props.selected(key)}
                      setStage={this.props.setCharacterStage}
                    />
                    <NavLink to={`/characters/${key}`} className="character-name">{value.name}</NavLink>
                  </div>
                ))
            }
        </div>
      </React.Fragment>
    )
  }
}

export default CharactersPage