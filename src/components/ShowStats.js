import React from 'react';

const ShowStats = ({playerStats}) => {
  return (
    
      <table>
        <thead>
          <tr>
            <th className="blue-grey-text text-darken-2">#</th>
            <th className="blue-grey-text text-darken-2">1PM</th>
            <th className="blue-grey-text text-darken-2">1PA</th>
            <th className="blue-grey-text text-darken-2">1P%</th>
            <th className="blue-grey-text text-darken-2">2PM</th>
            <th className="blue-grey-text text-darken-2">2PA</th>
            <th className="blue-grey-text text-darken-2">2P%</th>
            <th className="blue-grey-text text-darken-2">3PM</th>
            <th className="blue-grey-text text-darken-2">3PA</th>
            <th className="blue-grey-text text-darken-2">3P%</th>
            <th className="blue-grey-text text-darken-2">A</th>
            <th className="blue-grey-text text-darken-2">B</th>
            <th className="blue-grey-text text-darken-2">S</th>
            <th className="blue-grey-text text-darken-2">ORB</th>
            <th className="blue-grey-text text-darken-2">DRB</th>
            <th className="blue-grey-text text-darken-2">TO</th>
            <th className="blue-grey-text text-darken-2">EFF</th>
            <th className="blue-grey-text text-darken-2">PTS</th>
            <th className="blue-grey-text text-darken-2">+/-</th>
          </tr>
        </thead>
        <tbody>
          {playerStats && playerStats.map(playerStat => {
            return (
              <tr key={playerStat.playernumber}>
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
 
  );
};

export default ShowStats;