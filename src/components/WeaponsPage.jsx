import React from 'react';
import "./WeaponsPage.css";

let weaponList = ['bow', 'catalyst', 'claymore', 'polearm', 'sword'];

class WeaponsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { weaponFilters: [...weaponList] };
  }

  toggleWeapon(weapon) {
    let weaponFilters = this.state.weaponFilters;
    weaponFilters = weaponFilters.includes(weapon) ? weaponFilters.filter(item => item !== weapon) : [weapon, ...weaponFilters];
    this.setState({weaponFilters});
  }

  render() {
    return (
      <>
        <div className="filters">
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
  
        {
          Object.entries(this.props.weapons)
          .filter(([key, value]) => this.state.weaponFilters.includes(value.type))
          .map(([key, value]) => (
            <img key={key} className="weapon" src={process.env.PUBLIC_URL + '/images/weapons/' + key + '.png'} alt={value.name}/>
          ))
        }
      </>
    )
  }
  
}

export default WeaponsPage