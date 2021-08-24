import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import Skeleton from 'react-loading-skeleton';

import Heading from '../../common/Heading/Heading';
import { loadConversation, loadMoreMessages } from '../../../redux/slices/user/thunks';
import userSlice from '../../../redux/slices/user/user';
import ConversationMessage from './Conversation-message';

import "./Conversation-interface.scss";

import { IStoreState } from '../../../interfaces/state/i-store-state';
import { EUpdateSource } from '../../../interfaces/state/i-user-slice';

const ConversationInterface = () => {
    const [messageContent, setMessageContent] = React.useState<string>("");

    const conversationRef = React.useRef<HTMLDivElement>(null);
    const stickToElement = React.useRef<any>(null);
    const debounceRef = React.useRef<any>(null);
    const scrollStartRef = React.useRef<any>(null); 
    const isEndReachedRef = React.useRef<any>(null); 
    

    const dispatch = useDispatch<any>();
    const params = useParams<any>();

    const auth = useSelector((state: IStoreState) => state.auth);
    const conversation = useSelector((state: IStoreState) => state.user.conversation);

    const handleScrollThruMessages = () => {
        if (!scrollStartRef.current) {
            scrollStartRef.current = conversationRef.current?.scrollTop;
        }

        debounceRef.current && clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(async () => {
            if (conversationRef.current && (scrollStartRef.current > conversationRef.current.scrollTop && conversationRef.current.scrollTop < 50)) {
                stickToElement.current = conversationRef.current.children[0];

                const loadResult: any = await dispatch(loadMoreMessages({ token: auth.token, conversationId: params.conversationId, alreadyLoadedNumber: conversation.messages.length }));
                debounceRef.current = null;
                
                if (loadResult.payload.moreMessages.length < 10) {
                    conversationRef.current?.removeEventListener("scroll", handleScrollThruMessages);
                    isEndReachedRef.current = true;
                } 
            }
        }, 500)
    };

    const handeSendMessage = () => {
        dispatch(userSlice.actions["server/conversation/message/send"]({ senderToken: auth.token, conversationId: params.conversationId, messageContent }));
        setMessageContent("");
    };

    React.useEffect(() => {
        dispatch(loadConversation({ token: auth.token, conversationId: params.conversationId }));

        return () => { dispatch(userSlice.actions.clearConversation({})); };
    }, []);

    React.useEffect(() => {
        if (!conversation.isLoading) {

            if(true) { // !scrollStartRef.current
                if(conversation.updateSource === EUpdateSource.NEW) {
                    conversationRef?.current?.scrollTo(0, conversationRef.current.scrollHeight - conversationRef.current.offsetHeight + 15);
                } else {
                    conversationRef.current && (conversationRef.current.scrollTop = stickToElement.current.offsetTop - 126);
                }
            }

            !isEndReachedRef.current && setTimeout(() => { conversationRef.current?.addEventListener("scroll", handleScrollThruMessages) }, 500);
        }

        return () => {
             conversationRef.current?.removeEventListener("scroll", handleScrollThruMessages) 
        }
    }, [conversation.isLoading, conversation.messages.length]);

    return (<section className="section">
        <Heading type={1}>Conversation Interface</Heading>
        <div className="conversation">
            <div className="conversation-messages" ref={conversationRef}>
                {conversation.isLoading
                    ? <Skeleton height={"60vh"} />
                    : conversation?.messages?.length === 0
                        ? <React.Fragment>
                            <div className="conversation-start">
                                {conversation?.participants?.map((p) => <figure className="image is-64x64" key={p._id}>
                                    <img className="is-rounded" src={`http://localhost:3000/${p.avatar}`} />
                                </figure>)}
                            </div>
                            <div style={{ textAlign: "center" }}>This conversation is on!</div>
                        </React.Fragment>
                        : conversation?.messages.map(({ _id, speaker, content, dateOfTyping }) => {
                            const focusedParticipant = conversation?.participants?.find((participant) => participant._id === speaker);

                            return <ConversationMessage
                                key={_id}
                                auth={auth}
                                speaker={speaker}
                                content={content}
                                dateOfTyping={dateOfTyping}
                                focusedParticipant={focusedParticipant}
                            />
                        })
                }
            </div>
            <div className="conversation-compose">
                <article className="media compose-box">
                    <div className="media-content">
                        <div className="field message-content">
                            <p className="control">
                                <textarea className="textarea" placeholder="Message content" value={messageContent} onChange={(e) => setMessageContent(e.target.value)} />
                            </p>
                        </div>
                        <div className="button-container">
                            <button className="button is-info" onClick={handeSendMessage}>Send</button>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    </section>);
};

export default React.memo(ConversationInterface);