import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

//@ts-ignore
import logo from "./yasn-logo.png";
import "./Navbar.scss";
import AuthButtons from "./Auth-buttons/Auth-buttons";
import UserControls from './UserControls/User-controls';
import SearchBar from './Search-bar/Search-bar';

const Navbar = (props) => {
    const burgerRef = React.useRef<HTMLAnchorElement>(null);
    const menuRef = React.useRef<HTMLDivElement>(null);

    const user = useSelector((state: any) => state.user);

    const toggleBurger = () => {
        if (burgerRef.current && menuRef.current) {
            burgerRef.current.classList.toggle('is-active');
            menuRef.current.classList.toggle('is-active');
        }
    };

    return (
        <header className="header has-background-dark">
            <nav className="navbar px-2 py-3 is-info" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link to="/" className="navbar-item"><img src={logo} width="112" height="28" /></Link>
                    <SearchBar />

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" ref={burgerRef} onClick={toggleBurger}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                
                <div className="navbar-menu" ref={menuRef}>
                    {user._id ? <UserControls /> : <AuthButtons />}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;