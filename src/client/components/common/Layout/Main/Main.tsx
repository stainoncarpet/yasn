import React from 'react';

import "./Main.scss";

const Main = (props) => {
    return (
        <main className="main container container-medium">
            {props.children}
        </main>
    );
};

export default Main;