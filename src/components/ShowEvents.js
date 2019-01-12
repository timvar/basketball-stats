import React from 'react';

const ShowEvents = ({events, eventText}) => {
  
  const eventList = events.length ? (
    events.map(event => {
      const description = eventText.filter(item => {
        return item.event === event.event;
      });
      return (
        <li className="collection-item"><span className="history-player">{event.playernumber}</span><span className="history-event">{event.event}</span></li>
      )
    })
    )
    :
    (
      null
    );
  
  return (
    <ul className="collection">
      {eventList}
    </ul>
  );
}

export default ShowEvents;