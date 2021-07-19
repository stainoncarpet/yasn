import React from 'react';

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";

const Layout = (props) => {
    return (
        <React.Fragment>
            <Navbar />
            <Main>
                {props.children}
            </Main>
            <Footer />
        </React.Fragment>
    );
};

export default Layout;