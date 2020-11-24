import React, {useState} from 'react';
import { NavLink } from "react-router-dom";
import StarLevel from './StarLevel';
import TypeFilter from './TypeFilter';
import "./CharactersPage.css";

function CharactersPage(props) {
  const [searchText, setSearchText] = useState('');
  const [elementFilter, setElementFilter] = useState(undefined);
  const [weaponFilter, setWeaponFilter] = useState(undefined);

  return (
    <>
      <div className="filters">
        <div className="search-filter">
          <input
            type="text"
            value={searchText}
            placeholder="Search for a character..."
            onChange={(e) => setSearchText(e.target.value)} />
        </div>
        <TypeFilter type="element" checked={elementFilter} selectFilter={setElementFilter} />
        <TypeFilter type="weapon" checked={weaponFilter} selectFilter={setWeaponFilter} />
      </div>
      <div className="character-list">
        {
          Object.entries(props.characters)
            .filter(([key, value]) => searchText === undefined || key.includes(searchText.toLowerCase()))
            .filter(([key, value]) => elementFilter === undefined || elementFilter === value.type || value.type === 'flex')
            .filter(([key, value]) => weaponFilter === undefined || weaponFilter === value.weapon)
            .map(([key, value]) => (
              <div key={key} className="character-portrait">
                <button className="character-toggle">
                  <img
                    className={"character-icon" + (props.selected(key) ? "" : " inactive")}
                    src={process.env.PUBLIC_URL + "/images/characters/" + value.name + ".png"}
                    alt={value.name}
                    onClick={(e) => props.toggleCharacter(key, e)}
                    loading="lazy" />
                </button>
                {
                  key !== 'traveler' &&
                  <img
                    className={"character-type" + (props.selected(key) ? "" : " inactive")}
                    src={process.env.PUBLIC_URL + "/images/" + value.type + ".png"}
                    alt={value.type}
                    loading="lazy" />
                }
                <StarLevel
                  name={key}
                  level={props.getCharacterStage(key)}
                  disabled={!props.selected(key)}
                  setStage={props.setCharacterStage}
                />
                <NavLink to={`/characters/${key}`} className="character-name">{value.name}</NavLink>
              </div>
            ))
        }
      </div>
    </>
  )
}

export default CharactersPage