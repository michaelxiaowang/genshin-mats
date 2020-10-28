import React from 'react';
import Stages from './data/stages.json';
import Characters from './data/characters.json';
import Materials from './data/materials.json';

import './App.css';

let characters = {
  "amber": {
    stage: 5
  },
  "kaeya": {
    stage: 5
  },
  "lisa": {
    stage: 5
  }
}

let characterLevels = [1,2,3,4,5,6]

function App() {
  let materials = {};
  Object.entries(characters).forEach(([key, value]) => {
    const element = Characters[key].type;
    const elemental = Materials[element + '_elemental'].name;
    const specialty = Materials[Characters[key].specialty].name;
    for (let i = value.stage; i < 6; i++) {
      let stage = Stages.characters[i];
      const crystal = Materials[element + '_crystal_' + stage.crystal_stg].name;
      const common = Materials[Characters[key].common + '_' + stage.common_stg].name;
      materials[crystal] = materials.hasOwnProperty(crystal) ? materials[crystal] + stage.crystal_qty : stage.crystal_qty;
      materials[elemental] = materials.hasOwnProperty(elemental) ? materials[elemental] + stage.elemental_qty : stage.elemental_qty;
      materials[specialty] = materials.hasOwnProperty(specialty) ? materials[specialty] + stage.specialty_qty : stage.specialty_qty;
      materials[common] = materials.hasOwnProperty(common) ? materials[common] + stage.common_qty : stage.common_qty;
      materials.mora = materials.hasOwnProperty('mora') ? materials.mora + stage.mora: stage.mora
    }
  });
  console.log(materials);
  return (
    <div>
      <nav className="navbar">
        <ul>
          <li><a href="">Characters</a></li>
          <li><a href="">Talents</a></li>
          <li><a href="">Weapons</a></li>
          <li><a href="">Materials</a></li>
        </ul>
      </nav>
      <div className="character-list">
        {
          Object.values(Characters).map(character => (
            <div key={character.name} className="character-portrait">
              <img className="character-icon" src={process.env.PUBLIC_URL + '/images/characters/' + character.name + '.png'} alt={character.name}/>
              <div className="star-level">
                {
                  characterLevels.map(level => (
                    <img className="star" key={level} src={process.env.PUBLIC_URL + '/images/star.png'}/>
                  ))
                }
              </div>
              <label className="character-name">{character.name}</label>
            </div>
          ))
        }
      </div>
      {/* <div>
      {
        Object.values(Materials).map(material => (
          <img key={material.name} width="45" height="45" src={process.env.PUBLIC_URL + '/images/materials/' + material.name.replaceAll(' ', '_').toLowerCase() + '.png'} alt={material.name}/>
        ))
      }
      </div> */}
    </div>
  );
}

export default App;
