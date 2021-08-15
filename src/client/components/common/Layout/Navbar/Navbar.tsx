import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import "./Navbar.scss";
import NavbarBrand from './Navbar-brand/Navbar-brand';
import NavbarMenu from './Navbar-menu/Navbar-menu';
import NavbarEvents from './Navbar-events/Navbar-events';


const Navbar = () => {
    const events = useSelector((state: any) => state.user.events);
    const auth = useSelector((state: any) => state.auth)

    const dispatch = useDispatch();
    const history = useHistory();

    return (
        <header className="header has-background-dark">
            <nav className="navbar px-2 py-3 is-info" role="navigation" aria-label="main navigation">
                <NavbarBrand events={events} dispatch={dispatch} history={history} />
                {auth._id && <NavbarEvents events={events} dispatch={dispatch} history={history} />}
                <NavbarMenu />
            </nav>
        </header>
    );
};

export default Navbar;