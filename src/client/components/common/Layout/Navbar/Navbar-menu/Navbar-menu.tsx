import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import "./Navbar-menu.scss";

import UserControls from '../UserControls/User-controls';
import { logOut } from '../../../../../data/redux/slices/auth/thunks';

const NavbarMenu = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state: any) => state.auth);

    const handleClick = async () => dispatch(logOut({id: auth._id, token: auth.token}));

    return <div className="sidebar-navigation" aria-label="sidebar-navigation" role="navigation">
        <div id="menuToggle">
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
            <ul id="menu" style={{ height: document.body.scrollHeight }}>
                <UserControls />
                <br />
                <Link to="/about"><li>About</li></Link>
                <Link to="/terms-of-service"><li>Terms of service</li></Link>
                <Link to="/testing"><li>Testing</li></Link>
                <div className="navbar-item">
                    <button className="logout-icon" onClick={handleClick} style={{ borderRadius: "50%", width: "2rem!important", height: "2rem!important", minHeight: "2rem!important", maxHeight: "2rem!important" }}>
                        <i className="fas fa-sign-out-alt" />
                    </button>
                </div>
            </ul>
        </div>
    </div>
};

export default NavbarMenu;
