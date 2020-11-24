import React from 'react';
import { NavLink } from "react-router-dom";
import StarLevel from './StarLevel';
import "./WeaponInfo.css";
import { calculateWeaponMaterials } from '../utils';

function WeaponInfo(props) {
  const name = props.weapon.name;
  const weaponKey = getKey(name);
  const disabled = !props.selected(weaponKey);
  return (
    <>
      <NavLink className="back-button" to="/weapons">&larr;</NavLink>
      <div className={"character-info" + (!disabled ? '' : ' inactive')}>
        <div className="character-portrait info">
          <h1 className={"character-name info"}>{name}</h1>
          <div className="character-card">
            <button className="character-toggle">
              <img
                className={"character-icon"}
                src={process.env.PUBLIC_URL + '/images/weapons/' + weaponKey + '.png'}
                alt={name}
                onClick={(e) => props.toggleWeapon(weaponKey, e)} />
            </button>
          </div>
          <StarLevel
            name={weaponKey}
            level={props.stage}
            disabled={disabled}
            setStage={props.setWeaponStage}
          />
          <ul className="material-list info">
            {
              Object.entries(calculateWeaponMaterials(weaponKey, props.stage)).map(([key, value]) => (
                value > 0 &&
                <li key={key} className="material info">
                  <div className="material-image-container info">
                    <img className="material-image" src={getImagePath(key)} alt={key} />
                  </div>
                  <div className="material-text info">{value.toLocaleString()}</div>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}

function getKey(name) {
  return name.toLowerCase().replaceAll(' ', '_').replaceAll('\'', '').replaceAll('"', '');
}

function getImagePath(material) {
  const name = material.toLowerCase().replaceAll(' ', '_').replaceAll('\'', '').replaceAll('"', '');
  return process.env.PUBLIC_URL + '/images/materials/' + name + '.png'
}

export default WeaponInfo;