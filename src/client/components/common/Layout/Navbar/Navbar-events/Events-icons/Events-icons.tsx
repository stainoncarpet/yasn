import React from 'react';
import { useLocation } from 'react-router';

import "./Events-icons.scss";

// feed since last login
const EventsIcons = ({events, handleToggleEventsBox}) => {
    const {pathname} = useLocation();

    return (
        <div className="events-icons" style={{ position: "relative" }}>
            <a className={pathname !== "/friends" ? "icon-link" : "icon-link active"} onClick={() => handleToggleEventsBox(0)}>
                <i className="fas fa-users" />
                {events.friendRequests.unreadCount > 0 && <span className="notification-count">{events.friendRequests.unreadCount}</span>}
            </a>
            <a className={pathname !== "/conversations" ? "icon-link" : "icon-link active"} onClick={() => handleToggleEventsBox(1)}>
                <i className="fas fa-comments" />
                {events.newMessages.unreadCount > 0 && <span className="notification-count">{events.newMessages.unreadCount}</span>}
            </a>
            <a className={pathname !== "/notifications" ? "icon-link" : "icon-link active"} onClick={() => handleToggleEventsBox(2)}>
                <i className="fas fa-bell" />
                {events.unreadNotifications.unreadCount > 0 && <span className="notification-count">{events.unreadNotifications.unreadCount}</span>}
            </a>
            <a className={pathname !== "/feed" ? "icon-link" : "icon-link active"} onClick={() => handleToggleEventsBox(3)}>
                <i className="fas fa-newspaper"></i>
            </a>
        </div>
    );
};

export default EventsIcons;