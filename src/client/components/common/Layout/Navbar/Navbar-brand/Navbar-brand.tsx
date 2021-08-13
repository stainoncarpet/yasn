import React from 'react';
import { Link } from 'react-router-dom';

import NavbarEvents from '../Navbar-events/Navbar-events';

//@ts-ignore
import logo from "../yasn-logo.png";

import "./Navbar-brand.scss";

const NavbarBrand = ({ auth, events, dispatch, history }) => {
    return (
        <div className="separator is-flex">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item"><img src={logo} width="112" height="28" /></Link>
            </div>
            {auth._id && <NavbarEvents events={events} dispatch={dispatch} history={history} />}
        </div>
    );
};

export default NavbarBrand;
