import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markEventAsRead } from '../data/redux/slices/user/thunks';

const useMarkAsRead = () => {
    const auth = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    const handleMarkEventAsRead = React.useCallback((eventId) => { 
        dispatch(markEventAsRead({token: auth.token, eventId: eventId})) 
    }, []);

    return handleMarkEventAsRead;
};

export default useMarkAsRead;
