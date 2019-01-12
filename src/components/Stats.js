import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/database';

class Stats extends Component {
  state = {
    players: [],
    playerStats: []
  };

  getStats = () => {
    const gameId = '4272871';
    this.props.db.ref('/games/' + gameId + '/stats').once('value', (snap) => {
        let playerStats = [];
        snap.forEach((child) => {
          playerStats.push({
            id: child.key,
            a: child.val().a,
            b: child.val().b,
            onePTA: child.val().onePTA,
            onePTM: child.val().onePTM,
            onePCT: child.val().onePCT,
            oreb: child.val().oreb,
            dreb: child.val().dreb,
            s: child.val().s,
            threePTA: child.val().threePTA,
            threePTM: child.val().threePTM,
            threePCT: child.val().threePCT,
            to: child.val().to,
            twoPTA: child.val().twoPTA,
            twoPTM: child.val().twoPTM,
            twoPCT: child.val().twoPCT,
            eff: child.val().eff,
            pts: child.val().pts,
            pm: child.val().pm,
            playernumber: child.val().playernumber,
          });
        });
    //playerStats = this.bubbleSort(playerStats);
    this.setState({playerStats: playerStats});
    });
  }

  componentDidMount() {
    this.getStats();
  }
  
  render() {
    console.log(this.props);
    console.log(this.state.playerStats);
    const { playerStats } = this.state;
    return (
      <div className="container">
        <h1>Stats</h1>
        <table>
        <thead>
          <tr>
            <th>#</th>
            <th>1PTM</th>
            <th>1PTA</th>
            <th>1PT%</th>
            <th>2PTM</th>
            <th>2PTA</th>
            <th>2PT%</th>
            <th>3PTM</th>
            <th>3PTA</th>
            <th>3PT%</th>
            <th>A</th>
            <th>B</th>
            <th>S</th>
            <th>OREB</th>
            <th>DREB</th>
            <th>TO</th>
            <th>EFF</th>
            <th>PTS</th>
            <th>+/-</th>
          </tr>
        </thead>
        <tbody>
        {playerStats && playerStats.map(playerStat => {
          return (
            <tr key={playerStat.id}>
              <td>{playerStat.playernumber}</td>
              <td>{playerStat.onePTM}</td>
              <td>{playerStat.onePTA}</td>
              <td>{playerStat.onePCT}</td>
              <td>{playerStat.twoPTM}</td>
              <td>{playerStat.twoPTA}</td>
              <td>{playerStat.twoPCT}</td>
              <td>{playerStat.threePTM}</td>
              <td>{playerStat.threePTA}</td>
              <td>{playerStat.threePCT}</td>
              <td>{playerStat.a}</td>
              <td>{playerStat.b}</td>
              <td>{playerStat.s}</td>
              <td>{playerStat.oreb}</td>
              <td>{playerStat.dreb}</td>
              <td>{playerStat.to}</td>
              <td>{playerStat.eff}</td>
              <td>{playerStat.pts}</td>
              <td>{playerStat.pm}</td>
            </tr>
          );
        })
        }

        </tbody>
        </table>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    db: state.db
  };
}

export default connect(mapStateToProps)(Stats);
