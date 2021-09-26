import React from 'react';

import Layout from '../components/common/Layout/Layout';
import AboutInfo from "../components/specific/About/About";
import useCollapseMenus from '../custom-hooks/use-collapse-menus';

const About = () => {
    useCollapseMenus();

    return (
        <React.Fragment>
            <Layout>
                <AboutInfo />
            </Layout>
        </React.Fragment>
    )
}

export default About;
