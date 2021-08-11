import React from 'react';
import { Link } from 'react-router-dom';

import "./Icons.scss"

const Icons = () => {
    return (
        <div className="navbar-icons">
            <Link to="/friends" className="icon-link"><i className="far fa-user" /> <span className="notification-count">1</span></Link>
            <Link to="/conversations" className="icon-link"><i className="far fa-comments" /><span className="notification-count">11</span></Link>
            <Link to="/notifications" className="icon-link"><i className="far fa-bell" /><span className="notification-count">99+</span></Link>
        </div>
    );
};

export default Icons;