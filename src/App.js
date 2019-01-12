import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddPlayer from './components/misc/AddPlayer'; 
import Home from './components/Home';
import Contact from './components/Contact';
import About from './components/About';
import Post from './components/Post';
import PlayerList from './components/PlayerList';
import Stats from './components/Stats';
import RealGame from './components/RealGame';
import firebase from 'firebase/app';
import 'firebase/database';

class App extends Component {

  state = {
    players: [],
    playerStats: [],
    
  };


  addPlayer = (player) => {
    player.id = Math.random();
    let players = [...this.state.players, player];
    this.setState({
      players: players
    });
  }

  deletePlayer = (id) => {
    let players = this.state.players.filter(player => {
      return player.id !== id;
    });
    this.setState({players: players});
  }

  componentDidMount() {
    
  }

 

  render() {
    console.log(this.state);
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/stats' component={Stats} />
            <Route path='/players' component={PlayerList} />
            <Route path='/realtime' component={RealGame} />
            
            
          </Switch>  
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = (dispatch) => {

}


export default App;


/*
<PlayerList deletePlayer={this.deletePlayer} players={this.state.players} />
          <AddPlayer addPlayer={this.addPlayer} />
          
          <Route path='/posts/:post_id' component={Post} />
*/