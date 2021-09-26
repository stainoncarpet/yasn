import React from 'react';

import Layout from "../components/common/Layout/Layout";
import useCollapseMenus from '../custom-hooks/use-collapse-menus';
import C404 from '../components/specific/C404/C404';

const P404 = () => {
    useCollapseMenus();

    return (
        <React.Fragment>
            <Layout>
                <C404 />
            </Layout>
        </React.Fragment>
    );
};

export default P404;