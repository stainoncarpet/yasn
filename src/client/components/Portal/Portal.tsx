import React from 'react';
import ReactDOM from "react-dom";

import "./Portal.scss";

const Portal = (props) => {
    const {children, handleAccept, handleClose} = props;
    const el = document.getElementById("portal");

    const crust = <React.Fragment>
        <div className="portal-background"></div>
        <span className="close" onClick={handleClose}></span>
        {handleAccept && <span className="accept" onClick={handleAccept}>OK</span>}
        <div className="portal-contents">
        {children}
        </div>
    </React.Fragment>

    return el ? ReactDOM.createPortal(crust, el) : null
};

export default Portal;