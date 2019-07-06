import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="nav-wrapper red darken-4">
      <div className="container"> 
        <a className="brand-logo"> EBT T07 Tilastot</a>
        <ul className="right">
          <li><Link to="/">Matsit</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
