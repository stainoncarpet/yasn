import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import "./Icons.scss";

import { getEvents, markEventAsRead } from '../../../../../data/redux/slices/user/thunks';
import timer from '../../../../../helpers/timer';

const Icons = (props) => {
    const { } = props;
    const events = useSelector((state: any) => state.user.events);
    const auth = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (auth._id) {
            dispatch(getEvents({ token: auth.token, skip: null, limit: null, isUnreadOnly: true }));
        }
    }, [auth._id]);

    const handleMarkEventAsRead = (eventId) => {
        dispatch(markEventAsRead({token: auth.token, eventId: eventId}))
    };

    const handleToggleEventsBar = (eventTypeIndex) => {
        console.log("toggle ", eventTypeIndex);
    };

    const currentEventsOnDisplay = events.unreadNotifications;

    return (
        <React.Fragment>
            <div className="navbar-icons" style={{ position: "relative" }}>
                <a className="icon-link" onClick={() => handleToggleEventsBar(0)}>
                    <i className="far fa-user" />
                    {events.friendRequests.length > 0 && <span className="notification-count">{events.friendRequests.length}</span>}
                </a>
                <a className="icon-link" onClick={() => handleToggleEventsBar(1)}>
                    <i className="far fa-comments" />
                    {events.newMessages.length > 0 && <span className="notification-count">{events.newMessages.length}</span>}
                </a>
                <a className="icon-link" onClick={() => handleToggleEventsBar(2)}>
                    <i className="far fa-bell" />
                    {events.unreadNotifications.length > 0 && <span className="notification-count">{events.unreadNotifications.length}</span>}
                </a>
            </div>
            {false && <div className="event-digest p-2">
                {currentEventsOnDisplay.length > 0
                    ? currentEventsOnDisplay.map((e: any) =>
                        <div className="notification is-info" key={e._id}>
                            <button className="delete" onClick={() => handleMarkEventAsRead(e._id)}></button>
                            {e?.content} {timer.calculateTimeDifference(e?.dateOfCreation)}
                        </div>
                    )
                    : "You have no unread notifications"
                }
            </div>}
        </React.Fragment>

    );
};

export default Icons;