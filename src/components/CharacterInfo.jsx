import React from 'react';
import { NavLink } from "react-router-dom";
import StarLevel from './StarLevel';
import "./CharacterInfo.css";
import { calculateCharacterMaterials, calculateTalentMaterials } from '../utils';

function CharacterInfo(props) {
  const name = props.character.name;
  const characterKey = name.toLowerCase();
  const disabled = !props.selected(characterKey);
  const talents = props.character.talents;
  let element = name === 'Traveler' ? props.getTravelerElement() : props.character.type;
  return (
    <>
      <NavLink className="back-button" to="/characters">&larr;</NavLink>
      <div className={"character-info" + (!disabled ? '' : ' inactive')}>
        <div className="character-portrait info">
          <h1 className={"character-name info"}>{name}</h1>
          {
            characterKey === 'traveler' &&
            <select className="element-list" value={props.getTravelerElement()} onChange={(e) => props.setTravelerElement(e.target.value)}>
              {
                Object.keys(talents).map(element => (
                  <option key={element} value={element}>
                    {element.charAt(0).toUpperCase() + element.slice(1)}
                  </option>
                ))
              }
            </select>
          }
          <div className="character-card">
            <button className="character-toggle">
              <img
                className={"character-icon"}
                src={process.env.PUBLIC_URL + '/images/characters/' + name + '.png'}
                alt={name}
                onClick={(e) => props.toggleCharacter(characterKey, e)} />
            </button>
            {
              <img
                className={"character-type"}
                src={process.env.PUBLIC_URL + '/images/' + element + '.png'}
                alt={element} />
            }
          </div>
          <StarLevel
            name={characterKey}
            level={props.stage}
            disabled={disabled}
            setStage={props.setCharacterStage}
          />
          <ul className="material-list info">
            {
              Object.entries(calculateCharacterMaterials(characterKey, props.stage)).map(([key, value]) => (
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
        <div className="talent-info">
          <h1 className="talent-title">Talents</h1>
          <ul className="talent-list">
            {
              (name === 'Traveler' ? talents[props.getTravelerElement()] : talents).map(talent => (
                <li key={talent} className="talent">
                  <h3 className="talent-name">{talent}</h3>
                  <div className="talent-label">
                    <button className="talent-control"
                      disabled={disabled}
                      onClick={(e) => props.setTalentLevel(characterKey, talent, props.getTalentLevel(characterKey, talent) - 1)}>-</button>
                    <span className="talent-level">{`Lv. ${props.getTalentLevel(characterKey, talent)}`}</span>
                    <button className="talent-control"
                      disabled={disabled}
                      onClick={(e) => props.setTalentLevel(characterKey, talent, props.getTalentLevel(characterKey, talent) + 1)}>+</button>
                  </div>
                  <ul className="material-list info">
                    {
                      Object.entries(calculateTalentMaterials(characterKey, props.getTalentLevel(characterKey, talent) - 1)).map(([key, value]) => (
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
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}

function getImagePath(material) {
  const name = material.toLowerCase().replaceAll(' ', '_').replaceAll('\'', '').replaceAll('"', '');
  return process.env.PUBLIC_URL + '/images/materials/' + name + '.png'
}

export default CharacterInfo