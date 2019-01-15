import React, { Component } from 'react'
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/database';

class GameList extends Component {

  getGames = () => {
    const { db } = this.props;

    db.ref('games').once('value', (snap) => {
        let gameList = [];
        snap.forEach((item) => {
            gameList.push({
                id: item.val().info.gameid,
                home: item.val().info.home,
                away: item.val().info.away,
                date: item.val().info.date,
            });
        });
    gameList = this.bubbleSort(gameList);
    this.setState({games: gameList});
    });
  }


  render() {
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    db: state.db.db
  };
}

export default connect(mapStateToProps)(GameList);
