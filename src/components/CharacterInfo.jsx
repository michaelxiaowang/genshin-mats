import React from 'react';
import { NavLink } from "react-router-dom";
import StarLevel from './StarLevel';
import "./CharacterInfo.css";

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
        <div className="character-info-grp">
          <h2 className={"character-name"}>{name}</h2>
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
            <img
              className={"character-icon"}
              src={process.env.PUBLIC_URL + '/images/characters/' + name + '.png'}
              alt={name}
              onClick={(e) => props.toggleCharacter(characterKey, e)} />
            {
              <img
                className={"character-type"}
                src={process.env.PUBLIC_URL + '/images/' + element + '.png'}
                alt={element}/>
            }
          </div>         
          <StarLevel
            name={characterKey}
            level={props.stage}
            disabled={disabled}
            setStage={props.setCharacterStage}
          />
        </div>
        <div className="character-info-grp">
          <h2 className="talent-title">Talents</h2>
          <ul className="talent-list">
            {
              (name === 'Traveler' ? talents[props.getTravelerElement()] : talents).map(talent => (
                <li key={talent} className="talent">
                  <span className="talent-name">{talent}</span>
                  <div className="talent-label">
                    <button className="talent-control"
                      disabled={disabled}
                      onClick={(e) => props.setTalentLevel(characterKey, talent, props.getTalentLevel(characterKey, talent) - 1)}>-</button>
                    <span className="talent-level">{`Lv. ${props.getTalentLevel(characterKey, talent)}`}</span>
                    <button className="talent-control"
                      disabled={disabled}
                      onClick={(e) => props.setTalentLevel(characterKey, talent, props.getTalentLevel(characterKey, talent) + 1)}>+</button>
                  </div>

                </li>
              ))
            }
          </ul>
        </div>
        <div className="character-info-grp">
          <h2 className="ascension-title">Ascension</h2>
        </div>
      </div>
    </>
  )
}

export default CharacterInfo