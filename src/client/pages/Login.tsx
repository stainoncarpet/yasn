import React from 'react';

import Layout from "../components/common/Layout/Layout";
import LoginForm from '../components/Login-form/Login-form';

const Login = () => {
    return (
        <React.Fragment>
            <Layout>
            <LoginForm />
            </Layout>
        </React.Fragment>
    );
};

export default Login;
