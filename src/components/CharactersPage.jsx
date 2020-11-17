import React from 'react';
import { NavLink } from "react-router-dom";
import StarLevel from './StarLevel';
import "./CharactersPage.css";

const elementList = ['anemo', 'cryo', 'electro', 'dendro', 'geo', 'hydro', 'pyro'];
const weaponList = ['bow', 'catalyst', 'claymore', 'polearm', 'sword'];

class CharactersPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  selectElement(element) {
    const newElement = this.state.element === element ? undefined : element;
    this.setState({ element: newElement });
  }

  selectWeapon(weapon) {
    const newWeapon = this.state.weapon === weapon ? undefined : weapon;
    this.setState({ weapon: newWeapon });
  }

  setSearchText(searchText) {
    this.setState({ searchText });
  }

  render() {
    return (
      <>
        <div className="filters">
          <div className="search-filter">
            <input
              type="text"
              value={this.state.searchText}
              placeholder="Search for a character..."
              onChange={(e) => this.setSearchText(e.target.value)} />
          </div>

          <div className="element-filters">
            {
              elementList.map(element => (
                <React.Fragment key={element}>
                  <input
                    type="checkbox"
                    name={"element"}
                    id={element}
                    value={element}
                    checked={this.state.element === element}
                    onChange={() => this.selectElement(element)}
                  />
                  <label htmlFor={element}>
                    <img className="filter-image" src={process.env.PUBLIC_URL + '/images/' + element + '.png'} alt={element} />
                  </label>
                </React.Fragment>
              ))
            }
          </div>
          <div className="weapon-filters">
            {
              weaponList.map(weapon => (
                <React.Fragment key={weapon}>
                  <input
                    type="checkbox"
                    name={"weapon"}
                    id={weapon}
                    value={weapon}
                    checked={this.state.weapon === weapon}
                    onChange={() => this.selectWeapon(weapon)}
                  />
                  <label htmlFor={weapon}>
                    <img className="filter-image" src={process.env.PUBLIC_URL + '/images/' + weapon + '.png'} alt={weapon} />
                  </label>
                </React.Fragment>
              ))
            }
          </div>
        </div>
        <div className="character-list">
          {
            Object.entries(this.props.characters)
              .filter(([key, value]) => this.state.searchText === undefined || key.includes(this.state.searchText.toLowerCase()))
              .filter(([key, value]) => this.state.element === undefined || this.state.element === value.type || value.type === 'flex')
              .filter(([key, value]) => this.state.weapon === undefined || this.state.weapon === value.weapon)
              .map(([key, value]) => (
                <div key={key} className="character-portrait">
                  <img
                    className={"character-icon " + (this.props.selected(key) ? '' : 'inactive')}
                    src={process.env.PUBLIC_URL + '/images/characters/' + value.name + '.png'}
                    alt={value.name}
                    onClick={(e) => this.props.toggleCharacter(key, e)} />
                  {
                    key !== 'traveler' &&
                    <img
                      className={"character-type " + (this.props.selected(key) ? '' : 'inactive')}
                      src={process.env.PUBLIC_URL + '/images/' + value.type + '.png'}
                      alt={value.type} />
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
      </>
    )
  }
}

export default CharactersPage