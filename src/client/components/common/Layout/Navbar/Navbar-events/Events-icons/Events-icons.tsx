import React from 'react';

import "./Events-icons.scss";

// feed since last login
const EventsIcons = ({events, handleToggleEventsBox}) => {
    return (
        <div className="events-icons" style={{ position: "relative" }}>
            <a className="icon-link" onClick={() => handleToggleEventsBox(0)}>
                <i className="fas fa-users" />
                {events.friendRequests.unreadCount > 0 && <span className="notification-count">{events.friendRequests.unreadCount}</span>}
            </a>
            <a className="icon-link" onClick={() => handleToggleEventsBox(1)}>
                <i className="fas fa-comments" />
                {events.newMessages.unreadCount > 0 && <span className="notification-count">{events.newMessages.unreadCount}</span>}
            </a>
            <a className="icon-link" onClick={() => handleToggleEventsBox(2)}>
                <i className="fas fa-bell" />
                {events.unreadNotifications.unreadCount > 0 && <span className="notification-count">{events.unreadNotifications.unreadCount}</span>}
            </a>
            <a className="icon-link" onClick={() => handleToggleEventsBox(3)}>
                <i className="fas fa-newspaper"></i>
            </a>
        </div>
    );
};

export default EventsIcons;