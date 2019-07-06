import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import "react-table/react-table.css";

class Stats extends Component {

  constructor(props){
    super(props);
    this.state = {
      players: [],
      stats: []
    };
  }

  bubbleSort = (a) => {
    let swapp = false;
    let n = a.length-1;
    const x=a;
    do {
        swapp = false;
        for (let i=0; i < n; i++) {
            if (parseInt(x[i].playernumber) > parseInt(x[i+1].playernumber))
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

  getStats = () => {
    const gameId = this.props.match.params.id;

    this.props.db.ref('/games/' + gameId + '/stats').once('value', (snap) => {
        let stats = [];
        snap.forEach((child) => {
          stats.push({
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
    stats = this.bubbleSort(stats);
    this.setState({ stats });
    });
  }

  componentDidMount() {
    this.getStats();
  }
  
  render() {
    console.log(this.props);
    console.log(this.state.stats);
    const { stats } = this.state;

    const columns = [{
      Header: '#',
      accessor: 'playernumber',
      minWidth: 50,
      sortable: false,
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: 'PTS',
      accessor: 'pts',
      minWidth: 50,
      sortable: false,
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: '1PM',
      accessor: 'onePTM',
      minWidth: 50,
      sortable: false,
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: '1PA',
      accessor: 'onePTA',
      minWidth: 50,
      sortable: false,
      Cell: item => <div style={{ textAlign: "center" }}>{item.value}</div>
    },
    {
      Header: '1P%',
      accessor: 'onePCT',
      minWidth: 50,
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: '2PM',
      accessor: 'twoPTM',
      minWidth: 50,
      sortable: false,
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: '2PA',
      accessor: 'twoPTA',
      minWidth: 50,
      sortable: false,
      Cell: item => <div style={{ textAlign: "center" }}>{item.value}</div>
    },
    {
      Header: '2P%',
      accessor: 'twoPCT',
      minWidth: 50,
      sortable: false,
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: '3PM',
      accessor: 'threePTM',
      minWidth: 50,
      sortable: false,
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: '3PA',
      accessor: 'threePTA',
      minWidth: 50,
      sortable: false,
      Cell: item => <div style={{ textAlign: "center" }}>{item.value}</div>
    },
    {
      Header: '3P%',
      accessor: 'threePCT',
      minWidth: 50,
      sortable: false,
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: 'A',
      accessor: 'a',
      minWidth: 50,
      sortable: false,
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: 'B',
      accessor: 'b',
      minWidth: 50,
      sortable: false,
      Cell: item => <div style={{ textAlign: "center" }}>{item.value}</div>
    },
    {
      Header: 'S',
      accessor: 's',
      minWidth: 50,
      sortable: false,
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: 'ORB',
      accessor: 'oreb',
      minWidth: 50,
      sortable: false,
      Cell: item => <div style={{ textAlign: "center" }}>{item.value}</div>
    },
    {
      Header: 'DRB',
      accessor: 'dreb',
      minWidth: 50,
      sortable: false,
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: 'TO',
      accessor: 'to',
      minWidth: 50,
      sortable: false,
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: 'EFF',
      accessor: 'eff',
      minWidth: 50,
      sortable: false,
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: '+/-',
      accessor: 'pm',
      minWidth: 50,
      sortable: false,
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    }]

    return (
      <div className="container">
        <h6 className="center">Matsi ID: {this.props.match.params.id}</h6>
        <ReactTable
          data={stats}
          columns={columns}
          pageSize={12}
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

export default connect(mapStateToProps)(Stats);
