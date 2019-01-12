import React from 'react';

const LiveStatus = ({status}) => {

  const gameStatus = status === 'LIVE' ? ( 
    <span className="livegame red-text text-darken-4"><strong>LIVE</strong></span>
    ) : (
    <span className="teal-text text-darken-e">FINAL</span>
  );

  return (
    <span>
      {gameStatus}
    </span>
  )  
};

export default LiveStatus;
