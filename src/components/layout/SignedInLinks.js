import React from 'react';
import { NavLink } from 'react-router-dom';

const SignedInLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to='/'>Players</NavLink></li>
            <li><NavLink to='/'>Link2</NavLink></li>
            <li><NavLink to='/' className='btn btn-floating pink lighten-1'>BB</NavLink></li>

        </ul>
    );
}

export default SignedInLinks;