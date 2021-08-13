import React from 'react';

import "./Navbar-events.scss";

import userSlice from '../../../../../data/redux/slices/user/user';
import EventsBox from './Events-box/Events-box';
import EventsIcons from './Events-icons/Events-icons';
import useMarkAsRead from '../../../../../custom-hooks/use-mark-as-read';

const NavbarEvents = ({events, dispatch, history}) => {
    const handleMarkEventAsRead = useMarkAsRead();

    const handleToggleEventsBox = React.useCallback((eventTypeIndex) => {        
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

export default NavbarEvents;