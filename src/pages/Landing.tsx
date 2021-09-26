import React from 'react';
import { useSelector } from 'react-redux';

import HomeLanding from '../components/specific/Home-landing/Home-landing';
import useCollapseMenus from '../custom-hooks/use-collapse-menus';
import Portal from '../components/specific/Portal/Portal';
import SignupForm from '../components/specific/Signup-form/Signup-form';
import { IStoreState } from '../interfaces/state/i-store-state';

const Landing = () => {
    useCollapseMenus();

    const isPortalShown = useSelector((state: IStoreState) => state.misc.portal.isShown);

    return (
        <React.Fragment>
            <HomeLanding />
            {isPortalShown && <Portal><SignupForm /></Portal>}
        </React.Fragment>
    );
};

export default Landing;
