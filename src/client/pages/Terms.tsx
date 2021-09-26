import React from 'react';

import Layout from "../components/common/Layout/Layout";
import TermsOfService from '../components/Terms-of-service/Terms-of-service';
import useCollapseMenus from '../custom-hooks/use-collapse-menus';

const Login = () => {
    useCollapseMenus();

    return (
        <React.Fragment>
            <Layout>
            <TermsOfService />
            </Layout>
        </React.Fragment>
    );
};

export default Login;