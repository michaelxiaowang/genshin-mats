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

class App extends React.Component {

  constructor(props) {
    super(props)
    this.toggleCharacter = this.toggleCharacter.bind(this);
    this.setCharacterStage = this.setCharacterStage.bind(this);
    this.state = JSON.parse(localStorage.getItem('characters')) || { };
    // this.state = { }
    console.log(this.state);
  }

  toggleCharacter(character) {
    if (this.state.hasOwnProperty(character)) {
      if (this.state[character].stage === -1) {
        this.persistState({[character]: {stage: 0}});
      } else {
        this.persistState({[character]: {stage: -1}});
      }
    } else {
      this.persistState({[character]: {stage: 0}});
    }
  }

  setCharacterStage(character, stage) {
    this.persistState({[character]: {stage}}); // e.target.value is supposed to be integer, but somehow casted as string
  }

  persistState(state) {
    this.setState(state, () => localStorage.setItem('characters', JSON.stringify(this.state)));
  }

  render() {
    return (
      <HashRouter basename="/">
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
            <Route exact path="/" render={() => (
              <CharactersPage
                state={this.state}
                characters={Characters}
                toggleCharacter = {this.toggleCharacter}
                setCharacterStage = {this.setCharacterStage}/>
            )}/>
            <Route path="/Talents" component={TalentsPage}></Route>
            <Route path="/Weapons" component={WeaponsPage}></Route>
            <Route path="/Materials" render={() => (
              <MaterialsPage
                state={this.state}
                stages={Stages}
                characters={Characters}
                materials={Materials}/>
            )}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default App;
