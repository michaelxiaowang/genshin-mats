import React from 'react';
import { Route, NavLink, HashRouter, Redirect } from "react-router-dom";
import CharactersPage from './components/CharactersPage';
import CharacterInfo from './components/CharacterInfo';
import WeaponsPage from './components/WeaponsPage';
import MaterialsPage from './components/MaterialsPage';
import Stages from './data/stages.json';
import Characters from './data/characters.json';
import Materials from './data/materials.json';

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = JSON.parse(localStorage.getItem('state')) || { characters: {}, weapons: {} };
  }

  persistState(state) {
    this.setState(state, () => localStorage.setItem('state', JSON.stringify(this.state)));
  }

  toggleCharacter = (character) => {
    let characters = this.state.characters;
    let newObj = {};
    if (characters.hasOwnProperty(character)) {
      if (characters[character].stage === -1) {
        newObj = {[character]: {stage: 0}};
      } else {
        newObj = {[character]: {stage: -1}};
      }
    } else {
      newObj = {[character]: {stage: 0}};
    }
    characters = Object.assign({}, characters, newObj);
    this.persistState({characters});
  }

  setCharacterStage = (character, stage) => {
    const characters = Object.assign({}, this.state.characters, {[character]: {stage}});
    this.persistState({characters});
  }

  isCharacterSelected = (character) => {
    return this.state.characters.hasOwnProperty(character) && this.state.characters[character].stage !== -1;
  }

  getCharacterLevel = (character) => {
    return this.isCharacterSelected(character) ? this.state.characters[character].stage : -1;
  }

  render() {
    return (
      <HashRouter basename="/">
        <React.Fragment>
          <nav className="navbar">
            <ul>
              <li><NavLink exact to="/Characters">Characters</NavLink></li>
              <li><NavLink exact to="/Weapons">Weapons</NavLink></li>
              <li><NavLink exact to="/Materials">Materials</NavLink></li>
            </ul>
          </nav>
          <div className="content">
            <Route exact path="/">
              <Redirect to="/Characters"/>
            </Route>
            <Route exact path="/Characters" render={() => (
              <CharactersPage
                characters={Characters}
                selected={this.isCharacterSelected}
                getLevel={this.getCharacterLevel}
                toggleCharacter = {this.toggleCharacter}
                setCharacterStage = {this.setCharacterStage}/>
            )}/>
            <Route path="/characters/:character" render={(props) => (
              <CharacterInfo
                character={Characters[props.match.params.character]}
                selected={this.isCharacterSelected}
                level={this.getCharacterLevel(props.match.params.character)}
                toggleCharacter = {this.toggleCharacter}
                setCharacterStage = {this.setCharacterStage}/>
            )}/>
            <Route path="/Weapons" component={WeaponsPage}></Route>
            <Route path="/Materials" render={() => (
              <MaterialsPage
                state={this.state}
                stages={Stages}
                characters={Characters}
                materials={Materials}/>
            )}/>
          </div>
        </React.Fragment>
      </HashRouter>
    );
  }
}

export default App;
