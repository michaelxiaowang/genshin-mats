import React from 'react';
import { Route, NavLink, HashRouter } from "react-router-dom";
import Stages from './data/stages.json';
import Characters from './data/characters.json';
import Materials from './data/materials.json';

import './App.css';
import CharactersPage from './components/CharactersPage';
import TalentsPage from './components/TalentsPage';
import WeaponsPage from './components/WeaponsPage';
import MaterialsPage from './components/MaterialsPage';

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
    <HashRouter>
      <div>
        <nav className="navbar">
          <ul>
            <li><NavLink to="/">Characters</NavLink></li>
            <li><NavLink to="/Talents">Talents</NavLink></li>
            <li><NavLink to="/Weapons">Weapons</NavLink></li>
            <li><NavLink to="/Materials">Materials</NavLink></li>
          </ul>
        </nav>
        <div className="content">
          <Route exact path="/" render={() => (<CharactersPage characters={Characters}></CharactersPage>)}></Route>
          <Route path="/Talents" component={TalentsPage}></Route>
          <Route path="/Weapons" component={WeaponsPage}></Route>
          <Route path="/Materials" component={MaterialsPage}></Route>
        </div>
        {/* <div>
        {
          Object.values(Materials).map(material => (
            <img key={material.name} width="45" height="45" src={process.env.PUBLIC_URL + '/images/materials/' + material.name.replaceAll(' ', '_').toLowerCase() + '.png'} alt={material.name}/>
          ))
        }
        </div> */}
      </div>
    </HashRouter>
  );
}

export default App;
