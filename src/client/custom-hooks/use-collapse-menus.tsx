import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

import userSlice from '../redux/slices/user/user';
import miscSlice from '../redux/slices/misc/misc';
import { IStoreState } from '../interfaces/state/i-store-state';

const useCollapseMenus = () => {
    const {pathname} = useLocation();
    const dispatch = useDispatch();

    const {currentEventIndex} = useSelector((state: IStoreState) => state.user.events);
    const isPortalShown = useSelector((state: IStoreState) => state.misc.portal.isShown);
    const isSnackbarShown = useSelector((state: IStoreState) => state.misc.snackbar.isShown);   

    React.useEffect(() => {
        currentEventIndex !== null && dispatch(userSlice.actions.toggleEventsBox({eventTypeIndex: null}));
        isPortalShown && dispatch(miscSlice.actions.togglePortal({})); 
        isSnackbarShown && dispatch(miscSlice.actions.toggleSnackbar({})); 
    }, [pathname]);
};

export default useCollapseMenus;