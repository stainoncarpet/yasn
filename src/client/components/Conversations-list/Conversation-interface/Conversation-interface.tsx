import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import Heading from '../../common/Heading/Heading';
import { loadConversation } from '../../../redux/slices/user/thunks';
import userSlice from '../../../redux/slices/user/user';
import timer from '../../../helpers/timer';

import "./Conversation-interface.scss";

const ConversationInterface = () => {
    const [messageContent, setMessageContent] = React.useState("");
    //const [currentUser, setCurrentUser] = React.useState<any>(null);

    const dispatch = useDispatch();
    const params = useParams<any>();

    const auth = useSelector((state: any) => state.auth);
    const conversation = useSelector((state: any) => state.user.data.conversations.array.find((c) => params.conversationId === c._id));

    React.useEffect(() => {
        dispatch(loadConversation({ token: auth.token, conversationId: params.conversationId }));

        return () => { /* clean up */ };
    }, []);

    const handeSendMessage = () => {
        dispatch(userSlice.actions["server/conversation/message/send"]({ senderToken: auth.token, conversationId: params.conversationId, messageContent }))
    };
    

    return (
        <section className="section">
            <Heading type={1}>Conversation Interface</Heading>
            <div className="conversation">
                <div className="conversation-messages">
                    {conversation?.messages.length === 0
                        ? <React.Fragment>
                            <div className="conversation-start">
                                {
                                    conversation?.participants.map((p) => (
                                        <figure className="image is-64x64" key={p._id}>
                                            <img className="is-rounded" src={`http://localhost:3000/${p.avatar}`} />
                                        </figure>
                                    ))
                                }
                            </div>
                            <div style={{ textAlign: "center" }}>This conversation is on!</div>
                        </React.Fragment>
                        : conversation?.messages.map(({ _id, speaker, content, dateOfTyping }) => {
                            const focusedParticipant = conversation.participants.find((participant) => participant._id === speaker);

                            console.log("got ", focusedParticipant);
                            

                            return (
                                <div className={speaker === auth._id ? "conversation-message" : "conversation-message reverse"} key={_id}>
                                    <div className="speaker-box">
                                        <figure className="image is-64x64">
                                            <img className="is-rounded" src={`http://localhost:3000/${focusedParticipant.avatar}`} />
                                        </figure>
                                        <div className="speaker-name" style={{ textAlign: "center" }}>
                                            {speaker === auth._id
                                                ? "You"
                                                : focusedParticipant.fullName.split(" ")[0]
                                            }
                                        </div>
                                    </div>
                                    <div className="conversation-message-content">
                                        {content} <br />
                                        <time className="conversation-message-timestamp">{timer.calculateTimeDifference(dateOfTyping)}</time>
                                    </div>
                                </div>)
                        }
                        )
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
                                <button className="button is-info" onClick={handeSendMessage} >
                                    Send
                                </button>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default ConversationInterface;