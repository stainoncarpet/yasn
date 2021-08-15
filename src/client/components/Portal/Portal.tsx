import React from 'react';
import ReactDOM from "react-dom";

import "./Portal.scss";
import useDisableOverflow from '../../custom-hooks/use-disable-overflow';

const Portal = (props) => {
    const { children } = props;
    const el = document.getElementById("portal");

    useDisableOverflow();

    const crust = <React.Fragment>
        <div className="portal-background"></div>
        <div className="portal-contents">
            {children}
        </div>
    </React.Fragment>

    return el ? ReactDOM.createPortal(crust, el) : null
};

export default Portal;