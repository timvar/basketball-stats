import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="nav-wrapper red darken-4">
      <div className="container"> 
        <a className="brand-logo"> EBT T07</a>
        <ul className="right">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/realtime">Realtime</Link></li>
          <li><Link to="/stats">Stats</Link></li>
          <li><Link to="/players">Players</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
