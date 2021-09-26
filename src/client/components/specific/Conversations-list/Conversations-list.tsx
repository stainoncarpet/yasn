import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';

import Heading from '../../common/Heading/Heading';
import { getConversationsOverview } from '../../../redux/slices/user/thunks';
import userSlice from '../../../redux/slices/user/user';
import { IStoreState } from '../../../interfaces/state/i-store-state';

import "./Conversations-list.scss";
import ConversationsListItem from './Conversations-list-item/Conversations-list-item';
import { IConversationListItem } from '../../../interfaces/state/i-user-slice';

const ConversationsList = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state: IStoreState) => state.auth);
    const { array, isLoading } = useSelector((state: IStoreState) => state.user.lists.conversations);

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
                        {array.map(({ _id, interlocutor, lastMessage, typingUsers }: IConversationListItem) =>
                            (<ConversationsListItem
                                key={_id}
                                id={_id}
                                interlocutor={interlocutor}
                                lastMessage={lastMessage}
                                auth={auth}
                                typingUsers={typingUsers}
                            />)
                        )}
                    </div>
            }
        </section>
    );
};

export default ConversationsList;