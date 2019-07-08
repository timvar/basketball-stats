import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Games from './components/Games';
import Stats from './components/Stats';

class App extends Component {

  render() {
    console.log(this.state);
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Games} />
            <Route path='/stats/:id' component={Stats} />
          </Switch>  
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
