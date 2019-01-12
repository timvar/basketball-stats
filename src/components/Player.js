import React from 'react';

const Player = ({player}) => {
  return (
    <div className="row" key={player.id}>
      <tr>
        <td>Alvin</td>
        <td>Eclair</td>
        <td>$0.87</td>
      </tr>
    </div>
  );
};

export default Player;

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

/*
<div className="col s1 offset-s4">{player.playerNumber}</div>
          <div className="col s1">{player.firstName}</div>
          <div className="col s1">{player.lastName}</div>
          <div className="col s1"><i className="material-icons">edit</i></div>
*/            