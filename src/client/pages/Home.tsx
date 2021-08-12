import React from 'react';

import Layout from "../components/common/Layout/Layout";
import HomeLanding from '../components/Home-landing/Home-landing';
import useCollapseMenus from '../custom-hooks/use-collapse-menus';

const Home = () => {
    useCollapseMenus();

    return (
        <React.Fragment>
            <Layout>
            <HomeLanding />
            </Layout>
        </React.Fragment>
    );
};

export default Home;
