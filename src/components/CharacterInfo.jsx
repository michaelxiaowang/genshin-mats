import React from 'react';
import { NavLink } from "react-router-dom";
import StarLevel from './StarLevel';
import "./CharacterInfo.css";

function CharacterInfo(props) {
    const name = props.character.name;
    const talents = props.character.talents;
    return (
        <> 
            <NavLink className="back-button" to="/Characters">&larr;</NavLink>
            <div className="character-card">
                <h2 className="character-name info">{name}</h2>
                <img className="character-icon info" src={process.env.PUBLIC_URL + '/images/characters/' + name + '.png'} alt={name}/>
                <StarLevel
                      name={name.toLowerCase()}
                      level={props.stage}
                      disabled={!props.selected(name.toLowerCase())}
                      setStage={props.setCharacterStage}
                />
                <ul className="talent-list">
                    {
                        talents.map(talent => (
                            <li key={talent} className="talent">
                                <button className="talent-control" onClick={() => props.setTalentLevel(name.toLowerCase(), talent, props.getTalentLevel(name.toLowerCase(), talent) - 1)}>-</button>
                                <span className="talent-name">{`${talent} Lv. ${props.getTalentLevel(name.toLowerCase(), talent)}`}</span>
                                <button className="talent-control" onClick={() => props.setTalentLevel(name.toLowerCase(), talent, props.getTalentLevel(name.toLowerCase(), talent) + 1)}>+</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default CharacterInfo