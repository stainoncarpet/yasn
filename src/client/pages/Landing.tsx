import React from 'react';
import { useSelector } from 'react-redux';

import HomeLanding from '../components/Home-landing/Home-landing';
import useCollapseMenus from '../custom-hooks/use-collapse-menus';
import Portal from '../components/Portal/Portal';
import SignupForm from '../components/Signup-form/Signup-form';
import Snackbar from '../components/Snackbar/Snackbar';
import Snack from '../components/common/Snack/Snack';

const Landing = () => {
    useCollapseMenus();

    const isPortalShown = useSelector((state: any) => state.misc.portal.isShown);
    const isSnackbarShown = useSelector((state: any) => state.misc.snackbar.isShown);   

    return (
        <React.Fragment>
            <HomeLanding />
            {isPortalShown && <Portal><SignupForm /></Portal>}
            {isSnackbarShown && <Snackbar><Snack /></Snackbar>}
        </React.Fragment>
    );
};

export default Landing;
