import React from 'react';

import Layout from "../components/common/Layout/Layout";
import HomeLanding from '../components/Home-landing/Home-landing';

const Home = () => {
    return (
        <React.Fragment>
            <Layout>
            <HomeLanding />
            </Layout>
        </React.Fragment>
    );
};

export default Home;
