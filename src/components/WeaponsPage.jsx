import React from 'react';
import StarLevel from './StarLevel';
import "./WeaponsPage.css";

const weaponList = ['bow', 'catalyst', 'claymore', 'polearm', 'sword'];

class WeaponsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
              placeholder="Search for a weapon..."
              onChange={(e) => this.setSearchText(e.target.value)} />
          </div>
          <div className="weapon-filters">
            {
              weaponList.map(weapon => (
                <React.Fragment key={weapon}>
                  <input
                    type="checkbox"
                    id={weapon}
                    name={"weapon"}
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

        {
          <div className="weapon-list">
            {
              Object.entries(this.props.weapons)
                .filter(([key, value]) => this.state.searchText === undefined || value.name.toLowerCase().includes(this.state.searchText.toLowerCase()))
                .filter(([key, value]) => this.state.weapon === undefined || this.state.weapon === value.type)
                .map(([key, value]) => (
                  <div key={key} className={`weapon-details rarity-${value.rarity}`}>
                    <div className="weapon-card">
                      <button className="weapon-toggle" onClick={() => this.props.toggleWeapon(key)}>
                        <img className={"weapon-image" + (this.props.selected(key) ? ' ' : ' inactive')} src={process.env.PUBLIC_URL + '/images/weapons/' + key + '.png'} alt={value.name} />
                      </button>
                      <StarLevel
                        name={key}
                        level={this.props.getWeaponStage(key)}
                      // disabled={!this.props.selected(key)}
                        setStage={this.props.setWeaponStage} 
                      />
                      <label className="weapon-name">{value.name}</label>
                    </div>
                  </div>
                ))
            }
          </div>
        }
      </>
    )
  }

}

export default WeaponsPage