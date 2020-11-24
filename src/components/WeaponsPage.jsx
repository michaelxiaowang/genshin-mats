import React, {useState} from 'react';
import StarLevel from './StarLevel';
import TypeFilter from './TypeFilter';
import "./WeaponsPage.css";

function WeaponsPage(props) {
  const [searchText, setSearchText] = useState('');
  const [weaponFilter, setWeaponFilter] = useState(undefined);

  return (
    <>
      <div className="filters">
        <div className="search-filter">
          <input
            type="text"
            value={searchText}
            placeholder="Search for a weapon..."
            onChange={(e) => setSearchText(e.target.value)} />
        </div>
        <TypeFilter type="weapon" checked={weaponFilter} selectFilter={setWeaponFilter} />
      </div>
      {
        <div className="weapon-list">
          {
            Object.entries(props.weapons)
              .filter(([key, value]) => searchText === undefined || value.name.toLowerCase().includes(searchText.toLowerCase()))
              .filter(([key, value]) => weaponFilter === undefined || weaponFilter === value.type)
              .map(([key, value]) => (
                <div key={key} className={`weapon-details rarity-${value.rarity}`}>
                  <div className="weapon-card">
                    <button className="weapon-toggle" onClick={() => props.toggleWeapon(key)}>
                      <img
                        className={"weapon-image" + (props.selected(key) ? "" : " inactive")}
                        src={process.env.PUBLIC_URL + "/images/weapons/" + key + ".png"}
                        alt={value.name}
                        loading="lazy" />
                    </button>
                    <StarLevel
                      name={key}
                      level={props.getWeaponStage(key)}
                      disabled={!props.selected(key)}
                      setStage={props.setWeaponStage}
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


export default WeaponsPage