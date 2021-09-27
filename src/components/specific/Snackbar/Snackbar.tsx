import React from 'react';
import ReactDOM from "react-dom";

import "./Snackbar.scss";

const Snackbar = (props) => {
    const { children } = props;
    const el = document.getElementById("snackbar");

    const crust = <React.Fragment>
        <div className="snackbar-contents">
            {children}
        </div>
    </React.Fragment>

    return el ? ReactDOM.createPortal(crust, el) : null;
};

export default Snackbar;