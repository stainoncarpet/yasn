import React from 'react';

import "./Spinner.scss";

const Spinner = () => <div style={{minHeight: "55vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
    <div className="loader">Loading...</div>
    </div>;

export default Spinner;