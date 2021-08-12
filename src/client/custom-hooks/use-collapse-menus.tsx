import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

import userSlice from '../data/redux/slices/user/user';

// only the events box is redux-stateful
const useCollapseMenus = () => {
    const {pathname} = useLocation();
    const dispatch = useDispatch();
    const {currentEventIndex} = useSelector((state: any) => state.user.events);

    React.useEffect(() => {
        currentEventIndex !== null && dispatch(userSlice.actions.toggleEventsBox({eventTypeIndex: null}));
    }, [pathname]);
};

export default useCollapseMenus;