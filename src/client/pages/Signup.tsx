import React from 'react';

import Layout from "../components/common/Layout/Layout";
import SignupForm from "../components/Signup-form/Signup-form";
import useCollapseMenus from '../custom-hooks/use-collapse-menus';

const Signup = () => {
    useCollapseMenus();

    return (
        <React.Fragment>
            <Layout>
            <SignupForm />
            </Layout>
        </React.Fragment>
    )
}

export default Signup;
