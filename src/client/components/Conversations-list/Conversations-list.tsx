import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

import Heading from '../common/Heading/Heading';
import { getConversationsOverview } from '../../redux/slices/user/thunks';
import userSlice from '../../redux/slices/user/user';
import timer from '../../helpers/timer';

import "./Conversations-list.scss";

const ConversationsList = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state: any) => state.auth);
    const { array, isLoading } = useSelector((state: any) => state.user.lists.conversations);

    const clearConversationsList = userSlice.actions.clearConversationsList;

    React.useEffect(() => {
        dispatch(getConversationsOverview({ token: auth.token }));

        return () => { 
            dispatch(clearConversationsList({}))
         };
    }, []);

    return (
        <section className="section">
            <Heading type={1}>Conversations</Heading>

            {isLoading 
                ? <Skeleton height={96} /> 
                : array.length < 1
                    ? <p>You have no conversations</p>
                    : <div className="conversations-list">
                        {
                            array.map(({ _id, interlocutor, lastMessage }) => {
                                return <Link to={`/conversations/${_id}`} key={_id} >
                                    <div className="conversations-list-item">
                                    <div className="conversations-list-info">
                                        <figure className="image is-96x96">
                                                <img className="is-rounded" src={`http://localhost:3000/${interlocutor.avatar}`} alt={`${interlocutor.fullName}'s avatar`} />
                                        </figure>
                                        <div className="conversation-last-message" data-message-id={lastMessage._id}>
                                            <div>{lastMessage.speaker._id === auth._id ? "You" : lastMessage.speaker.fullName}: {lastMessage.content} </div>
                                            <div><time className="conversation-message-timestamp">({timer.calculateTimeDifference(lastMessage.dateOfTyping)})</time></div>
                                        </div>
                                    </div>
                                </div>
                                </Link>
                            })
                        }
                    </div>
            }
        </section>
    );
};

export default ConversationsList;