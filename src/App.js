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
    this.toggleCharacter = this.toggleCharacter.bind(this);
    this.setCharacterStage = this.setCharacterStage.bind(this);
    this.state = JSON.parse(localStorage.getItem('characters')) || { };
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
                state={this.state}
                characters={Characters}
                toggleCharacter = {this.toggleCharacter}
                setCharacterStage = {this.setCharacterStage}/>
            )}/>
            <Route path="/characters/:character" render={(props) => (
              <CharacterInfo
                character={Characters[props.match.params.character]}/>
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
