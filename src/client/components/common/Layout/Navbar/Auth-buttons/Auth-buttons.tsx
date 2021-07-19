import React from 'react';
import { Link } from "react-router-dom";

const AutButtons = () => {
    return (
        <div className="navbar-end">
            <div className="navbar-item">
                <div className="buttons">
                    <Link to="/signup" className="button is-success mr-2"><strong>Sign up</strong></Link>
                    <Link to="/login" className="button is-light">Log in</Link>
                </div>
            </div>
        </div>
    );
};

export default AutButtons;
