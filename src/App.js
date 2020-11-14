import React from 'react';
import { Route, NavLink, HashRouter, Redirect } from "react-router-dom";
import CharactersPage from './components/CharactersPage';
import CharacterInfo from './components/CharacterInfo';
import WeaponsPage from './components/WeaponsPage';
import MaterialsPage from './components/MaterialsPage';
import Stages from './data/stages.json';
import Characters from './data/characters.json';
import Materials from './data/materials.json';
import Weapons from './data/weapons.json';

import './App.css';

/*
Initialize character state to stage = -1 (disabled) and all talent levels to 1
*/
const DEFAULT_CHARACTER_STATE = Object.entries(Characters).reduce((state, [key, value]) => {
  const traveler = key === 'traveler';
  let talents = {};
  if (traveler) {
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
  let character = {stage: -1, talents};
  if (traveler) {
    character.element = 'anemo';
  }
  return Object.assign(state, {[key]: character});
}, {});

const DEFAULT_WEAPON_STATE = Object.keys(Weapons).reduce((state, key) => {
  return Object.assign(state, {[key]: {stage: -1}});
}, {});

const DEFAULT_STATE = { characters: DEFAULT_CHARACTER_STATE, weapons: DEFAULT_WEAPON_STATE };

class App extends React.Component {
  
  constructor(props) {
    super(props)
    const savedState = JSON.parse(localStorage.getItem('state')) || DEFAULT_STATE;
    const savedCharacters = Object.assign({}, DEFAULT_CHARACTER_STATE, {...savedState.characters});
    const savedWeapons = Object.assign({}, DEFAULT_WEAPON_STATE, {...savedState.weapons});
    this.state = Object.assign({}, DEFAULT_STATE, {characters: {...savedCharacters}, weapons: {...savedWeapons}});
  }

  persistState(state) {
    this.setState(state, () => localStorage.setItem('state', JSON.stringify(this.state)));
  }

  /*
  Set the character state back to default
  Toggle the character between stage 0 (enabled) or -1 (disabled)
  */
  toggleCharacter = (character) => {
    let characters = this.state.characters;
    const currentCharacter = characters[character];
    const stage = currentCharacter.stage === 0 ? -1 : 0;
    const newState = Object.assign(currentCharacter, {...DEFAULT_CHARACTER_STATE[character], stage});
    characters = Object.assign({}, {...characters, [character]: newState});
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
    const currentCharacter = this.state.characters[character];
    const talents = currentCharacter.talents;
    return character === 'traveler' ? talents[currentCharacter.element][talent] : talents[talent];
  }

  setTalentLevel = (character, talent, level) => {
    if (level < 1 || level > 10) {
      return;
    }
    let currentCharacter = this.state.characters[character];
    let currentTalents = currentCharacter.talents;
    if (character === 'traveler') {
      const element = currentCharacter.element;
      const elementalTalents = Object.assign({}, currentTalents[element], {[talent]: level});
      currentTalents = Object.assign({}, currentTalents, {[element]: elementalTalents});
    } else {
      currentTalents = Object.assign({}, currentTalents, {[talent]: level});
    }
    currentCharacter = Object.assign({}, currentCharacter, {talents: currentTalents});
    const characters = Object.assign({}, this.state.characters, {[character]: currentCharacter});
    this.persistState({characters});
  }

  isCharacterSelected = (character) => {
    return this.state.characters[character].stage !== -1;
  }

  getTravelerElement = () => {
    return this.state.characters.traveler.element;
  }

  setTravelerElement = (element) => {
    const characters = this.state.characters;
    this.persistState({characters: Object.assign({...characters}, {traveler: {...characters.traveler, element}})});
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
                setTalentLevel={this.setTalentLevel}
                getTravelerElement={this.getTravelerElement}
                setTravelerElement={this.setTravelerElement}/>
            )}/>
            <Route path="/weapons" render={(props) => (
              <WeaponsPage
                weapons={Weapons}
              />
            )}/>
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
