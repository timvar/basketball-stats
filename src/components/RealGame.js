import React, { Component } from 'react'
import { connect } from 'react-redux';
//import firebase from 'firebase/app';
import 'firebase/database';
import ShowStats from './ShowStats';
import LiveStatus from './LiveStatus';
import ShowEvents from './ShowEvents';
//import eventText from './config/eventText';


class RealGame extends Component {
  state = {
    events: [],
    eventHistory: [],
    scoreEvents: [],
    playerStats: [],
    ebtScore: 0,
    oppScore: 0,
    home: '',
    away: '',
    date: '',
    gameId: '',
    status: '',
  };
  
  getGameInfo = () => {
    const { db } = this.props;
    const gameId = '5000';
    
    db.ref('/games/' + gameId + '/info').on('value', (snap) => {
      this.setState({
        home: snap.val().home, 
        away: snap.val().away, 
        date: snap.val().date,
        gameId: snap.val().gameid,
        status: snap.val().status
      });
    });
  }

  calculateOppScore = () => {
    const { scoreEvents } = this.state;
    let oppScore = 0;

    for (let item of scoreEvents) {
      switch (item.event) {
        case 'OS1P':
          oppScore +=1;
          break;
        case 'OS1M':
          oppScore -=1;
          break;
      }
    }
    this.setState({oppScore});
  }

  calculateStats = () => {
    const { events } = this.state;
    let ebtScore = 0;
    let playerStats = [];
    let lastTenEvents = [];
    let map = new Map();
    let idx=events.length-1;

    while ( (idx >= 0) && (lastTenEvents.length <= 11)) {
      switch (events[idx].event) {
        case 'PM1P':
          break;
        case 'PM2P':
          break;
        case 'PM3P':
          break;
        case 'PM1M':
          break;
        case 'PM2M':
          break;
        case 'PM3M':
          break;
        case 'OS1P':
          break;
        case 'OS1M':
          break;
        default:
          lastTenEvents.push(events[idx]);
      }
      idx--;
      
    }

    if (lastTenEvents.length > 10) {
      lastTenEvents.pop();
    }

    this.setState({eventHistory: lastTenEvents});

    /* Create array for storing player stats */
    for (let item of events) {
      if (!map.has(item.playernumber)){
        map.set(item.playernumber, true);
        playerStats.push({playernumber: item.playernumber,
          onePTM: 0,
          twoPTM: 0,
          threePTM: 0,
          onePTA: 0,
          twoPTA: 0,
          threePTA: 0,
          onePCT: 0,
          twoPCT: 0,
          threePCT: 0,
          pts: 0,
          a: 0,
          b: 0,
          oreb: 0,
          dreb: 0,
          s: 0,
          to: 0,
          eff: 0,
          pm: 0,
        });
      }
    }
  
  /* Calculate game score */
  for (let item of events) {
    switch (item.event) {
      case '1PTM':
        ebtScore +=1;
        break;
      case '2PTM':
        ebtScore +=2;
        break;
      case '3PTM':
        ebtScore +=3;
        break;
    }
  }
  this.setState({ebtScore});
  
  /* find the player and accumulate his/her statistics */
  for (let item of events) {
    let i = playerStats.findIndex(x => x.playernumber == item.playernumber);
      switch (item.event) {
        case '1PTM':
          playerStats[i].onePTM ++;
          playerStats[i].onePTA ++;
          break;
        case '2PTM':
          playerStats[i].twoPTM ++;
          playerStats[i].twoPTA ++;
          break;
        case '3PTM':
          playerStats[i].threePTM ++;
          playerStats[i].threePTA ++;
          break;
        case '1PTA':
          playerStats[i].onePTA ++;
          break;
        case '2PTA':
          playerStats[i].twoPTA ++;
          break;
        case '3PTA':
          playerStats[i].threePTA ++;
          break;
        case 'A':
          playerStats[i].a ++;
          break;
        case 'B':
          playerStats[i].b ++;
          break;
        case 'OREB':
          playerStats[i].oreb ++;
          break;
        case 'DREB':
          playerStats[i].dreb ++;
          break;
        case 'S':
          playerStats[i].s ++;
          break;
        case 'TO':
          playerStats[i].to ++;
          break;
        case 'PM1P':
          playerStats[i].pm +=1;
          break;
        case 'PM2P':
          playerStats[i].pm +=2;
          break;
        case 'PM3P':
          playerStats[i].pm +=3;
          break;
        case 'PM1M':
          playerStats[i].pm -=1;
          break;
        case 'PM2M':
          playerStats[i].pm -=2;
          break;
        case 'PM3M':
          playerStats[i].pm -=3;
          break;
        case 'OS1P':
          playerStats[i].pm -=1;
          break;
        case 'OS1M':
          playerStats[i].pm +=1;
          break;
      }
    }

    /* Calculate shot accuracy (%) */

    for (let item of playerStats) {
      if (item.onePTA == 0) {
      item.onePCT = 0;
      }
      else {
      item.onePCT = Math.round(1000 * item.onePTM / item.onePTA) / 10;
      }
      
      if (item.twoPTA == 0) {
      item.twoPCT = 0;
      }
      else {
      item.twoPCT = Math.round(1000 * item.twoPTM / item.twoPTA) / 10;
      }

      if (item.threePTA == 0) {
      item.threePCT = 0;
      }
      else {
      item.threePCT = Math.round(1000 * item.threePTM / item.threePTA) / 10;
      }

      item.eff =  (item.onePTM + (item.twoPTM * 2) + (item.threePTM * 3) + 
      item.oreb + item.dreb + item.a + item.s + item.b - item.to - 
      (item.threePTA - item.threePTM) - (item.twoPTA - item.twoPTM) - (item.onePTA - item.onePTM));

      item.pts =  (item.onePTM + (item.twoPTM * 2) + (item.threePTM * 3)); 
    }
    
    this.setState({playerStats});
  }
/*
  getEvents = () => {
    const { db } = this.props;
    const gameId = '5000';
    let eventList = [];

    db.ref('/games/' + gameId + '/events').on('value', (snap) => {
        snap.forEach((child) => {
          eventList.push({
              id: child.key,
              event: child.val().event,
              playernumber: child.val().number,
          });
        });
      this.setState({events: eventList});  
    });
  }
*/
  getEvent = () => {
    const { db } = this.props;
    const gameId = '5000';
    let eventList = [];
    let scoreEventList = [];

    db.ref('/games/' + gameId + '/events').on('child_added', (snap) => {
      const event = {
        id: snap.key,
        event: snap.val().event,
        playernumber: snap.val().number
      }
      eventList = [...this.state.events, event];
      this.setState({events: eventList}, () => this.calculateStats());    
    });

    db.ref('/games/' + gameId + '/events').on('child_removed', (snap) => {
      
      const newEventList = this.state.events.filter(event => {
        return event.id !== snap.key;
      });

      this.setState({events: newEventList}, () => this.calculateStats());    
    });

    db.ref('/games/' + gameId + '/score').on('child_added', (snap) => {
      const scoreEvent = {
        id: snap.key,
        event: snap.val().event
      }
      scoreEventList = [...this.state.scoreEvents, scoreEvent]  
      this.setState({scoreEvents: scoreEventList}, () => this.calculateOppScore());    
    });
  }
  

  componentDidMount() {
    this.getGameInfo();
    this.getEvent();
  }

  componentWillUnmount() {
    const { db } = this.props;
    const gameId = '5000';
    db.ref('/games/' + gameId + '/events').off();
    db.ref('/games/' + gameId + '/score').off();
    db.ref('/games/' + gameId + '/info').off();
  }

  
  render() {
    console.log('events', this.state.events);
    //console.log(this.state.playerStats);
    console.log('vastustajan score', this.state.scoreEvents);
    console.log('ebt', this.state.ebtScore);
    console.log('vastustaja', this.state.oppScore);
    //console.log(this.state.home);
    //console.log(this.state.away);
    //console.log(this.state.date);
    //console.log(this.state.gameId);
    console.log('event history', this.state.eventHistory);

    const eventText = [
      {
        event: '1PTM',
        text: 'Yhden pisteen kori'
      },
      {
        event: '2PTM',
        text: 'Kahden pisteen kori'
      },
      {
        event: '2PTA',
        text: 'Kahden pisteen heittoyritys'
      },
      {
        event: 'A',
        text: 'Syöttö'
      }
    ]


    const { playerStats } = this.state;
    
    return (
      <div className="container">
        <div className="section">
          <div className="row center">
            <span className="gameinfo blue-grey-text text-darken-2">Home:</span>
            <span className="gameinfo blue-grey-text text-darken-2">{this.state.home}</span>
            <span className="gameinfo blue-grey-text text-darken-2">Away:</span>
            <span className="gameinfo blue-grey-text text-darken-2">{this.state.away}</span>
            <span className="gameinfo blue-grey-text text-darken-2">Date:</span>
            <span className="gameinfo blue-grey-text text-darken-2">{this.state.date}</span>
            <span className="gameinfo blue-grey-text text-darken-2">Game ID:</span>
            <span className="gameinfo blue-grey-text text-darken-2">{this.state.gameId}</span>
            <LiveStatus status={this.state.status} />
          </div>
        </div>
        <div className="divider"></div>
        <div className="section">
          <div className="row center">
            <span className="team blue-grey-text text-darken-2">EBT:</span>
            <span className="ebtscore">{this.state.ebtScore}</span>
            <span className="vs">vs</span>
            <span className="team blue-grey-text text-darken-2">Vastustaja:</span>
            <span className="oppscore ">{this.state.oppScore}</span>
          </div>  
        </div>
        <div className="divider"></div>
        <div className="row">
          <div className="col s9">
            <ShowStats playerStats={playerStats} />
          </div>
          <div className="col s3">
            <p className="eventlist center blue-grey-text text-darken-2"><strong>Events</strong></p>
            <ShowEvents eventText={eventText} events={this.state.eventHistory} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    db: state.db.db
  };
}

export default connect(mapStateToProps)(RealGame);

