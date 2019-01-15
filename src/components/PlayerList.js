import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/database';
import Player from './Player';
import { Link } from 'react-router-dom';

class PlayerList extends Component {
  state = {
    players: [],
  };

  

  getPlayers = () => {
    const { db } = this.props;
    db.ref('players').once('value', (snap) => {
      let playerList = [];
      snap.forEach((child) => {
        playerList.push({
            id: child.key,
            firstName: child.val().first,
            lastName: child.val().last,
            playerNumber: child.val().nbr,
            inRoster: false
        });
      //playerList = this.bubbleSort(playerList);
      
      });
      this.setState({players: playerList});
    });
  }

  componentDidMount() {
    this.getPlayers();
  }
  
  render() {
    const { players } = this.state;
    console.log(players);
    return (
      
      <div className="container" >
        <h4 className="center">Players</h4>
        <table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Item Name</th>
              <th>Item Price</th>
          </tr>
        </thead>

        <tbody>

        {players && players.map(player => {
          return (

            <Link to={'/player/' + player.id} key={player.id}>
              <Player player={player} />
            </Link>
          );
        })
        }
        </tbody>
        </table>

      </div>
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    db: state.db.db
  };
}

export default connect(mapStateToProps)(PlayerList);

/*
 div.

        
        
          <span onClick={() => {deletePlayer(player.id)}}>{player.playerNumber}</span>
          <span>{player.firstName}</span>
          <span>{player.lastName}</span>
*/

/*
<table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Item Name</th>
              <th>Item Price</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
          </tr>
          <tr>
            <td>Alan</td>
            <td>Jellybean</td>
            <td>$3.76</td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>Lollipop</td>
            <td>$7.00</td>
          </tr>
        </tbody>
      </table>


*/