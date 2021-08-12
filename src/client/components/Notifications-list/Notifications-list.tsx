import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Heading1 from '../common/Heading1/Heading1';

import { getDataByType } from '../../data/redux/slices/user/thunks';
import useStringParser from '../../custom-hooks/use-string-parser';
import timer from '../../helpers/timer';

const NotificationsList = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state: any) => state.auth);
    const data = useSelector((state: any) => state.user.data);
    const parse = useStringParser();

    React.useEffect(() => {
        dispatch(getDataByType({ token: auth.token, skip: null, limit: null, types: ["notification"] }));
    }, []);

    return (
        <section className="section">
            <Heading1>Notifications</Heading1>
            {data.notifications.map((n) => (
                    <p className={n.isRead ? "notification" : "notification is-info"} key={n._id}>
                        {!n.isRead && <button className="delete"></button>}
                        {parse(n.content, n._id)}
                        <span className="event-time"> {timer.calculateTimeDifference(n.dateOfCreation)}</span>
                    </p>
            ))}
        </section>
    );
};

export default NotificationsList;