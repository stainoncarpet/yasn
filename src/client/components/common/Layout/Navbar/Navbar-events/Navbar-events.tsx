import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import "./Navbar-events.scss";

import { getUnreadEvents, markEventAsRead } from '../../../../../data/redux/slices/user/thunks';
import userSlice from '../../../../../data/redux/slices/user/user';
import EventsBox from './Events-box/Events-box';
import EventsIcons from './Events-icons/Events-icons';

const Icons = () => {
    const events = useSelector((state: any) => state.user.events);
    const auth = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const history = useHistory();

    React.useEffect(() => {
        if (auth._id) {
            dispatch(getUnreadEvents({ token: auth.token, skip: null, limit: null }));
        }
    }, [auth._id]);

    const handleMarkEventAsRead = React.useCallback((eventId) => { dispatch(markEventAsRead({token: auth.token, eventId: eventId})) }, []);

    const handleToggleEventsBox = React.useCallback( (eventTypeIndex) => {        
        if(eventTypeIndex === 0) {
            events.friendRequests.requests.length === 0 
                ? (events.currentEventIndex === null || events.currentEventIndex !== eventTypeIndex)
                    ? history.push("/friends") 
                    : dispatch(userSlice.actions.toggleEventsBox({eventTypeIndex}))
                : dispatch(userSlice.actions.toggleEventsBox({eventTypeIndex}));
        } else if(eventTypeIndex === 1) {
            events.newMessages.messages.length === 0
                ? (events.currentEventIndex === null || events.currentEventIndex !== eventTypeIndex)
                    ? history.push("/conversations")
                    : dispatch(userSlice.actions.toggleEventsBox({eventTypeIndex}))
                : dispatch(userSlice.actions.toggleEventsBox({eventTypeIndex}));
        } else if(eventTypeIndex === 2) {
            events.unreadNotifications.notifications.length === 0 
                ? (events.currentEventIndex === null || events.currentEventIndex !== eventTypeIndex )
                    ? history.push("/notifications")
                    : dispatch(userSlice.actions.toggleEventsBox({eventTypeIndex}))
                : dispatch(userSlice.actions.toggleEventsBox({eventTypeIndex}));
        }
    }, [events]);

    return (
        <React.Fragment>
            <EventsIcons events={events} handleToggleEventsBox={handleToggleEventsBox} />
            <EventsBox events={events} handleMarkEventAsRead={handleMarkEventAsRead} />
        </React.Fragment>

    );
};

export default Icons;