import React from 'react';

import Layout from "../components/common/Layout/Layout";
import SignupForm from "../components/Signup-form/Signup-form";

const Signup = () => {
    return (
        <React.Fragment>
            <Layout>
            <SignupForm />
            </Layout>
        </React.Fragment>
    )
}

export default Signup;
