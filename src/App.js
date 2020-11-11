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

/*
Initialize character state to stage = -1 (disabled) and all talent levels to 1
*/
const DEFAULT_CHARACTER_STATE = Object.entries(Characters).reduce((state, [key, value]) => {
  let talents = {};
  if (key === 'traveler') {
    Object.entries(value.talents).reduce((obj, [key2, value2]) => {
      let nestedTalents = value2.reduce((obj2, nestedTalent) => {
        return Object.assign(obj2, {[nestedTalent]: 1});
      }, {});
      return Object.assign(obj, {[key2]: nestedTalents});
    }, talents);
  } else {
    value.talents.map(talent => {
      return Object.assign(talents, {[talent]: 1});
    });
  }
  return Object.assign(state, {[key]: {stage: -1, talents}});
}, {});

const DEFAULT_STATE = { characters: DEFAULT_CHARACTER_STATE, weapons: {} };

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = JSON.parse(localStorage.getItem('state')) || DEFAULT_STATE;
    console.log(this.state);
  }

  persistState(state) {
    this.setState(state, () => localStorage.setItem('state', JSON.stringify(this.state)));
  }

  /*
  Set the character to stage 0 (enabled) or -1 (disabled)
  Set the character talents to level 1 (default)
  */
  toggleCharacter = (character) => {
    let characters = this.state.characters;
    let stage = 0;
    const talents = {};
    if (characters[character].stage === -1) {
      stage = 0;
    } else {
      stage = -1;
    }
    Object.assign(talents, DEFAULT_CHARACTER_STATE[character].talents);
    const newObj = Object.assign({}, {[character]: {stage, talents}});
    characters = Object.assign({}, characters, newObj);
    this.persistState({characters});
  }

  getCharacterStage = (character) => {
    return this.isCharacterSelected(character) ? this.state.characters[character].stage : -1;
  }

  setCharacterStage = (character, stage) => {
    const newState = Object.assign({}, this.state.characters[character], {stage});
    const characters = Object.assign({}, this.state.characters, {[character]: newState});
    this.persistState({characters});
  }

  getTalentLevel = (character, talent) => {
    return this.state.characters[character].talents[talent];
  }

  setTalentLevel = (character, talent, level) => {
    if (level < 1 || level > 8) {
      return;
    }
    let currentCharacter = this.state.characters[character];
    let currentTalents = currentCharacter.talents;
    currentTalents = Object.assign({}, currentTalents, {[talent]: level});
    currentCharacter = Object.assign({}, currentCharacter, {talents: currentTalents});
    const characters = Object.assign({}, this.state.characters, {[character]: currentCharacter});
    this.persistState({characters});
  }

  isCharacterSelected = (character) => {
    return this.state.characters[character].stage !== -1;
  }

  render() {
    return (
      <HashRouter basename="/">
        <React.Fragment>
          <nav className="navbar">
            <ul>
              <li><NavLink exact to="/characters">Characters</NavLink></li>
              <li><NavLink exact to="/weapons">Weapons</NavLink></li>
              <li><NavLink exact to="/materials">Materials</NavLink></li>
            </ul>
          </nav>
          <div className="content">
            <Route exact path="/">
              <Redirect to="/characters"/>
            </Route>
            <Route exact path="/characters" render={() => (
              <CharactersPage
                characters={Characters}
                selected={this.isCharacterSelected}
                getCharacterStage={this.getCharacterStage}
                toggleCharacter={this.toggleCharacter}
                setCharacterStage={this.setCharacterStage}/>
            )}/>
            <Route path="/characters/:character" render={(props) => (
              <CharacterInfo
                character={Characters[props.match.params.character]}
                selected={this.isCharacterSelected}
                stage={this.getCharacterStage(props.match.params.character)}
                toggleCharacter={this.toggleCharacter}
                setCharacterStage={this.setCharacterStage}
                getTalentLevel={this.getTalentLevel}
                setTalentLevel={this.setTalentLevel}/>
            )}/>
            <Route path="/weapons" component={WeaponsPage}></Route>
            <Route path="/materials" render={() => (
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
