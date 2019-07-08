import React, { Component } from 'react'
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import "react-table/react-table.css";
import { Link } from 'react-router-dom';

class GameList extends Component {

  constructor(props){
    super(props);
    this.state = {
      games: []
    };
  }
  
  bubbleSort = (a) => {
    let swapp = false;
    let n = a.length-1;
    const x=a;
    do {
        swapp = false;
        for (let i=0; i < n; i++) {
            if (parseInt(x[i].id) < parseInt(x[i+1].id))
            {
                let temp = x[i];
                x[i] = x[i+1];
                x[i+1] = temp;
                swapp = true;
            }
        }
        n--;
    } while (swapp);
    return x; 
  }

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

  componentDidMount() {
    this.getGames();
  }
  
  render() {
    const { games } = this.state;
    console.log(games);
    const columns = [{
      id: 'showStats',
      Header: 'ID',
      sortable: false,
      accessor: game => {
        return (
          <Link to={'/stats/' + game.id}>
            <div style={{ textAlign: "center" }}>{game.id}</div>
          </Link>
        );
      }
    },
    {
      Header: 'Koti',
      accessor: 'home',
      sortable: false,
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: 'Vieras',
      accessor: 'away',
      sortable: false,
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: 'PVM',
      accessor: 'date',
      sortable: false,
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    }]

    return (
      <div className="container" >
        <ReactTable
          data={games}
          columns={columns}
          showPagination={true}
          pageSize={20}
          minRows={0}
          className="-striped -highlight"
        />

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
