import React from 'react';

const PlayerList = ({players, deletePlayer}) => {
    const playerList = players.map(player => {
        return (
            <div className="player" key={player.id}>
                <div>First name: {player.firstName}</div>
                <div>Last name: {player.lastName}</div>
                <div>Player number: {player.playerNumber}</div>
                <button onClick={() => deletePlayer(player.id)}>Delete</button>
            </div>
        );
    });
    return (
        <div className="player-list">
            { playerList }
        </div>
    );
};

export default PlayerList;