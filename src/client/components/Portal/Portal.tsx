import React from 'react';
import ReactDOM from "react-dom";

import "./Portal.scss";
import togglePortal from '../../data/context/action-creators/toggle-portal';
import UserContext from '../../data/context/User-context';

const Portal = (props) => {
    const el = document.getElementById("portal");

    const {state, dispatch} = React.useContext<any>(UserContext);

    const closeModal = () => {
        dispatch(togglePortal());
    };

    const crust = <React.Fragment>
        <div className="portal-background"></div>
        <span className="close" onClick={closeModal}></span>
        <div className="portal-contents">
        {props.children}
        </div>
    </React.Fragment>

    return el ? ReactDOM.createPortal(crust, el) : null
};

export default Portal;