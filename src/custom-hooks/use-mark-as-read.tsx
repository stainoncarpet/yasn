import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { markEventAsRead } from '../redux/slices/user/thunks';
import { IStoreState } from '../interfaces/state/i-store-state';

const useMarkAsRead = () => {
    const auth = useSelector((state: IStoreState) => state.auth);
    const dispatch = useDispatch();

    const handleMarkEventAsRead = React.useCallback((eventId) => { 
        dispatch(markEventAsRead({eventId: eventId})) 
    }, []);

    return handleMarkEventAsRead;
};

export default useMarkAsRead;
