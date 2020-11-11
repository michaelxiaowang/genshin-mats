import React from 'react';
import { NavLink } from "react-router-dom";
import StarLevel from './StarLevel';
import "./CharacterInfo.css";

function CharacterInfo(props) {
    const name = props.character.name;
    const characterKey = name.toLowerCase();
    const talents = props.character.talents;
    const disabled = !props.selected(characterKey);
    return (
        <> 
            <NavLink className="back-button" to="/Characters">&larr;</NavLink>
            <div className="character-card">
                <h2 className={"character-name info "  + (!disabled ? '' : 'inactive')}>{name}</h2>
                <img
                    className={"character-icon info "  + (!disabled ? '' : 'inactive')}
                    src={process.env.PUBLIC_URL + '/images/characters/' + name + '.png'}
                    alt={name}
                    onClick={(e) => props.toggleCharacter(characterKey, e)}/>
                <StarLevel
                      name={characterKey}
                      level={props.stage}
                      disabled={disabled}
                      setStage={props.setCharacterStage}
                />
                <ul className="talent-list">
                    {
                        characterKey !== 'traveler' &&
                        talents.map(talent => (
                            <li key={talent} className={"talent "  + (!disabled ? '' : 'inactive')}>
                                <button className="talent-control"
                                    disabled={disabled}
                                    onClick={() => props.setTalentLevel(characterKey, talent, props.getTalentLevel(characterKey, talent) - 1)}>-</button>
                                <span className="talent-name">{`${talent} Lv. ${props.getTalentLevel(characterKey, talent)}`}</span>
                                <button className="talent-control"
                                    disabled={disabled}
                                    onClick={() => props.setTalentLevel(characterKey, talent, props.getTalentLevel(characterKey, talent) + 1)}>+</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default CharacterInfo