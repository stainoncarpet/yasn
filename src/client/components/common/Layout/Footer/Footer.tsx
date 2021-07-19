import React from 'react';
import {Link} from "react-router-dom"

import "./Footer.scss";

const Footer = () => {
    return (
        <footer className="footer is-info">
            <div className="content has-text-centered">
                <div className="footer-navigation pb-3 flex">
                    <Link to="/about" className="navbar-item is-size-5" style={{display: "inline-block"}}>About</Link>
                    <Link to="/about" className="navbar-item is-size-5" style={{display: "inline-block"}}>Terms of service</Link>
                    <Link to="/about" className="navbar-item is-size-5" style={{display: "inline-block"}}>Something else</Link>
                </div>
                <p><strong>YASN</strong> - Yet Another Social Network by <a href="https://www.linkedin.com/in/anton-o-voronov/">Anton Voronov</a>.</p>
            </div>
        </footer>
    );
};

export default Footer;