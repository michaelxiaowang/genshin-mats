import React from 'react';
import "./CharacterInfo.css";

function CharacterInfo(props) {
    return (
        <h1>{props.match.params.character}</h1>
    )
}

export default CharacterInfo