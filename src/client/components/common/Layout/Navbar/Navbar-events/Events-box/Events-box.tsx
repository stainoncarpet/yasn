import React from 'react';
import { Link } from 'react-router-dom';

import useStringParser from '../../../../../../custom-hooks/use-string-parser';

import timer from '../../../../../../helpers/timer';

import "./Events-box.scss";

const EventsBox = ({events, handleMarkEventAsRead}) => {
    const currentEventsOnDisplay = events.currentEventIndex === 0 ? events.friendRequests.requests : events.currentEventIndex === 1 ? events.newMessages.messages : events.unreadNotifications.notifications;
    const parse = useStringParser();

    return (
        <React.Fragment>
            {events.currentEventIndex !== null && <div className="events-box p-2">
                {currentEventsOnDisplay.length > 0
                    ? <React.Fragment>
                        {
                            currentEventsOnDisplay.map((e: any) => {
                                // need to find away to turn a href into Link to
                                return <p className="notification is-info" key={e._id}>
                                    <button className="delete" onClick={() => handleMarkEventAsRead(e._id)}></button>
                                    {parse(e.content, e._id)}
                                    <span className="event-time"> {timer.calculateTimeDifference(e?.dateOfCreation)}</span>
                                </p>
                            })
                        }
                    </React.Fragment>
                    : <article className="message">
                        <p className="message-body">
                            You have no unread notifications
                        </p>
                    </article>
                }
                <p style={{textAlign: "end", padding: "0 0.5rem 0.5rem 0"}}>
                            <Link to={events.currentEventIndex === 0 ? "/friends" : events.currentEventIndex === 1 ? "/conversations" : "/notifications"}>
                                See All
                            </Link>
                        </p>
            </div>}
        </React.Fragment>
    );
};

export default EventsBox;
