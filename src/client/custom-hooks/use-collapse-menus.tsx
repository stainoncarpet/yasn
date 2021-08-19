import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

import userSlice from '../redux/slices/user/user';
import miscSlice from '../redux/slices/misc/misc';

const useCollapseMenus = () => {
    const {pathname} = useLocation();
    const dispatch = useDispatch();

    const {currentEventIndex} = useSelector((state: any) => state.user.events);
    const isPortalShown = useSelector((state: any) => state.misc.portal.isShown);
    const isSnackbarShown = useSelector((state: any) => state.misc.snackbar.isShown);   

    React.useEffect(() => {
        currentEventIndex !== null && dispatch(userSlice.actions.toggleEventsBox({eventTypeIndex: null}));
        isPortalShown && dispatch(miscSlice.actions.togglePortal({})); 
        isSnackbarShown && dispatch(miscSlice.actions.toggleSnackbar({})); 
    }, [pathname]);
};

export default useCollapseMenus;