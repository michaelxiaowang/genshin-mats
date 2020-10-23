import React, { Component } from 'react';
import Stages from './data/stages.json';
import Characters from './data/characters.json';
import Materials from './data/materials.json';

import './App.css';

let characters = {
  "amber": {
    stage: 4
  },
  "kaeya": {
    stage: 0
  },
  "lisa": {
    stage: 0
  }
}

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
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div>
      {
        Object.values(Characters).map(character => (
          <img src={process.env.PUBLIC_URL + '/images/characters/' + character.name + '.png'} alt={character.name}/>
        ))
      }
    </div>
  );
}

export default App;
