import React from 'react';
import { NavLink } from "react-router-dom";
import "./CharacterInfo.css";

let characterLevels = [6,5,4,3,2,1]; // reversed order because rotateY done in css due to nature of css selectors

function CharacterInfo(props) {
    const name = props.character.name;
    const talents = props.character.talents;
    return (
        <> 
            <NavLink className="back-button" to="/Characters">&larr;</NavLink>
            <div className="character-card">
                <h2 className="character-name info">{name}</h2>
                <img className="character-icon info" src={process.env.PUBLIC_URL + '/images/characters/' + name + '.png'} alt={name}/>
                <div className="star-level">
                    {
                        characterLevels.map(level => (
                            <React.Fragment key={level}>
                                <input
                                    id={`${name}${level}`}
                                    type="radio"
                                    name={name}
                                    value={level}
                                />
                                <label htmlFor={`${name}${level}`}></label>
                            </React.Fragment>
                        ))
                    }
                </div>
                <ul className="talent-list">
                    {
                        talents.map(talent => (
                            <li key={talent} className="talent">{talent}</li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default CharacterInfo