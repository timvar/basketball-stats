import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Games from './components/GameList';
import PlayerList from './components/PlayerList';
import Stats from './components/Stats';
// import firebase from 'firebase/app';
import 'firebase/database';

class App extends Component {

  state = {
    players: [],
    playerStats: [],
    
  };

  render() {
    console.log(this.state);
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Games} />
            <Route path='/stats' component={Stats} />
            <Route path='/players' component={PlayerList} />
          </Switch>  
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {

}

export default App;
