import React from 'react';

import HomeLanding from '../components/Home-landing/Home-landing';
import useCollapseMenus from '../custom-hooks/use-collapse-menus';

const Landing = () => {
    useCollapseMenus();

    return (
        <React.Fragment>
            <HomeLanding />
        </React.Fragment>
    );
};

export default Landing;
