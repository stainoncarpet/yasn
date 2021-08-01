import React from 'react';
import { useLocation } from 'react-router';

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import Main from "./Main/Main";

const Layout = (props) => {
    const location = useLocation();

    React.useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    }, [location.pathname]);

    
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