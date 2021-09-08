import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import Heading from '../../common/Heading/Heading';
import { loadConversation, loadMoreMessages } from '../../../redux/slices/user/thunks';
import userSlice from '../../../redux/slices/user/user';
import Conversation from './Conversation';
import ConversationStub from './Conversation-stub';
import Spinner from '../../common/Spinner/Spinner';

import "./Conversation-interface.scss";

import { IStoreState } from '../../../interfaces/state/i-store-state';
import { EUpdateSource } from '../../../interfaces/state/i-user-slice';
import ConversationComposer from './Conversation-composer';

const ConversationInterface = () => {
    const [messageContent, setMessageContent] = React.useState<string>("");

    const conversationRef = React.useRef<HTMLDivElement>(null);
    const debounceRef = React.useRef<any>(null);
    const scrollStartRef = React.useRef<any>(null);
    const isEndReachedRef = React.useRef<any>(null);

    const dispatch = useDispatch<any>();
    const params = useParams<any>();

    const auth = useSelector((state: IStoreState) => state.auth);
    const conversation = useSelector((state: IStoreState) => state.user.conversation);

    const handleSetMessageContent = React.useCallback((c) => { setMessageContent(c) }, [])

    const handleScrollThruMessages = () => {
        if (!scrollStartRef.current) {
            scrollStartRef.current = conversationRef.current?.scrollTop;
        }

        debounceRef.current && clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(async () => {
            if (conversationRef.current && (scrollStartRef.current > conversationRef.current.scrollTop && conversationRef.current.scrollTop < 50)) {
                const loadResult: any = await dispatch(loadMoreMessages({ token: auth.token, conversationId: params.conversationId, alreadyLoadedNumber: conversation.messages.length }));
                debounceRef.current = null;

                if (loadResult?.payload?.moreMessages.length < 10) {
                    conversationRef.current?.removeEventListener("scroll", handleScrollThruMessages);
                    isEndReachedRef.current = true;
                }
            }
        }, 500)
    };

    const handeSendMessage = React.useCallback(() => {
        dispatch(userSlice.actions["server/conversation/message/send"]({ senderToken: auth.token, conversationId: params.conversationId, messageContent }));
        setMessageContent("");
    }, [messageContent])

    const handleMarkMessagesAsRead = () => {
        const arr: NodeListOf<HTMLDivElement> | undefined = conversationRef.current?.querySelectorAll(`.conversation-message.reverse[data-message-read="false"]`);
        const unreadMessageIds = new Array();

        if (arr) {
            for (let i = 0; i < arr.length; i++) {
                console.error("only those that are in viewport");
                unreadMessageIds.push(arr[i].dataset.messageId);
            }
        }

        if (unreadMessageIds.length > 0) {
            console.log(unreadMessageIds);
            dispatch(userSlice.actions["server/conversation/message/read"]({ readerToken: auth.token, conversationId: conversation._id, messageIds: unreadMessageIds }));
        }
    };

    React.useEffect(() => {
        dispatch(loadConversation({ token: auth.token, conversationId: params.conversationId }));

        return () => {
            dispatch(userSlice.actions.clearConversation({}));
        };
    }, []);

    React.useEffect(() => {
        console.log(!conversation.isLoading, !scrollStartRef.current, conversation.updateSource === EUpdateSource.NEW);

        scrollStartRef.current = null;

        if (!conversation.isLoading) {
            if (!scrollStartRef.current) { // 
                if (conversation.updateSource === EUpdateSource.NEW) {
                    conversationRef?.current?.scrollTo(0, conversationRef.current.scrollHeight - conversationRef.current.offsetHeight + 15);
                } else {
                    const scrollToMessageId = (conversation.messages.length % 10 === 0) 
                        ?  conversation.messages[conversation.messages.length - 11]._id 
                        : conversation.messages[(Math.ceil(conversation.messages.length / 10) * 10) - 11]._id;

                    const scrollToElement: HTMLDivElement | null | undefined = conversationRef.current?.querySelector(`div[data-message-id="${scrollToMessageId}"]`); 
                    conversationRef.current && scrollToElement && (conversationRef.current.scrollTop = scrollToElement.offsetTop - 126);
                }
            }

            !isEndReachedRef.current && setTimeout(() => { conversationRef.current?.addEventListener("scroll", handleScrollThruMessages) }, 500);
        }

        return () => {
            conversationRef.current?.removeEventListener("scroll", handleScrollThruMessages);
        }
    }, [conversation.isLoading, conversation.messages.length]);

    //testing
    React.useEffect(() => {
        conversationRef.current?.addEventListener("scroll", handleMarkMessagesAsRead);

        //!conversation.isLoading && handleMarkMessagesAsRead();

        return () => { conversationRef.current?.removeEventListener("scroll", handleMarkMessagesAsRead) };
    }, [conversation.isLoading])

    return (<section className="section">
        <Heading type={1}>Conversation Interface</Heading>
        <div className="conversation-interface">
            <div className="conversation-messages" ref={conversationRef}>
                {conversation.isLoading
                    ? <Spinner />
                    : conversation?.messages?.length === 0
                        ? <ConversationStub participants={conversation.participants} />
                        : <Conversation messages={conversation.messages} participants={conversation.participants} auth={auth} />
                }
            </div>
            <ConversationComposer messageContent={messageContent} handleSetMessageContent={handleSetMessageContent} handeSendMessage={handeSendMessage} />
        </div>
    </section>);
};

export default React.memo(ConversationInterface);