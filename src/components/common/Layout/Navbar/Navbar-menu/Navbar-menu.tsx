import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import "./Navbar-menu.scss";

import UserControls from '../UserControls/User-controls';
import { logOut } from '../../../../../redux/slices/auth/thunks';
import SearchBar from '../Search-bar/Search-bar';
import { IStoreState } from '../../../../../interfaces/state/i-store-state';

const NavbarMenu = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state: IStoreState) => state.auth);

    const handleClick = async () => dispatch(logOut());

    return <div className="sidebar-navigation" aria-label="sidebar-navigation" role="navigation">
        <div id="menuToggle">
            <input type="checkbox" id="toggler" />
            <span></span>
            <span></span>
            <span></span>
            <ul id="menu" >
                {auth._id && <UserControls />}
                {auth._id && <SearchBar />}
                <br />
                <Link to="/settings"><li>Settings</li></Link>
                <Link to="/about"><li>About</li></Link>
                <Link to="/terms-of-service"><li>Terms of service</li></Link>
                {auth._id && <a onClick={handleClick} ><li>Log out</li> </a>}
            </ul>
        </div>
    </div>
};

export default NavbarMenu;
