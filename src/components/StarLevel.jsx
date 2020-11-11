import React from 'react';
import './StarLevel.css';

const characterLevels = [6,5,4,3,2,1]; // reversed order because rotateY done in css due to nature of css selectors

function StarLevel(props) {
    const name = props.name;
    const disabled = props.disabled;
    const currentLevel = props.level;
    return (
        <div className="star-level">
            {
            characterLevels.map(level => (
                <React.Fragment key={level}>
                    <input
                        id={`${name}${level}`}
                        type="radio"
                        name={name}
                        value={level}
                        disabled={disabled}
                        checked={!disabled && level === currentLevel}
                        onChange={() => props.setStage(name, level)}/>
                    <label htmlFor={`${name}${level}`}></label>
                </React.Fragment>
            ))
            }
        </div>
    )
}

export default StarLevel;