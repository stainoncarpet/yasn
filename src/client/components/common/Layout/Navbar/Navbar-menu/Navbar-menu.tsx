import React from 'react';

import "./Navbar-menu.scss";

import UserControls from '../UserControls/User-controls';

const NavbarMenu = ({menuRef, burgerRef, toggleBurger}) => {
    return (
        <React.Fragment>
            <div className="navbar-burger">
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" ref={burgerRef} onClick={toggleBurger}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div className="navbar-menu" ref={menuRef}>
            <UserControls />
            </div>
        </React.Fragment>
    );
};

export default NavbarMenu;
