import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import "./Navbar.scss";
import SearchBar from './Search-bar/Search-bar';
import NavbarBrand from './Navbar-brand/Navbar-brand';
import NavbarMenu from './Navbar-menu/Navbar-menu';

const Navbar = () => {
    const burgerRef = React.useRef<HTMLAnchorElement>(null);
    const menuRef = React.useRef<HTMLDivElement>(null);

    const auth = useSelector((state: any) => state.auth);
    const events = useSelector((state: any) => state.user.events);

    const dispatch = useDispatch();
    const history = useHistory();

    const toggleBurger = React.useCallback(() => {
        if (burgerRef.current && menuRef.current) {
            burgerRef.current.classList.toggle('is-active');
            menuRef.current.classList.toggle('is-active');
        }
    }, [])

    return (
        <header className="header has-background-dark">
            <nav className="navbar px-2 py-3 is-info" role="navigation" aria-label="main navigation">
                <NavbarBrand auth={auth} events={events} dispatch={dispatch} history={history} />
                <NavbarMenu auth={auth} menuRef={menuRef} burgerRef={burgerRef} toggleBurger={toggleBurger} />
            </nav>
        </header>
    );
};

export default Navbar;