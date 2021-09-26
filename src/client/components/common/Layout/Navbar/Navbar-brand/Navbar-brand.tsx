import React from 'react';
import { Link } from 'react-router-dom';

//@ts-ignore
import logo from "../yasn-logo.png";

import "./Navbar-brand.scss";

const NavbarBrand = ({ events, dispatch, history }) => {
    return (
        <div className="separator is-flex">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item"><img src={logo} width="112" height="28" /></Link>
            </div>
        </div>
    );
};

export default NavbarBrand;
