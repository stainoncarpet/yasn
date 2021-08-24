import { initialState } from "./user";

import {IMessage} from "../../../interfaces/state/i-user-slice";
import { IMessageAction } from "../../../interfaces/actions/i-message-action";
import { IUserSlice, EUpdateSource } from "../../../interfaces/state/i-user-slice";


const reducers = {
    "server/send/frequest": (user, action: any) => {},
    "client/send/frequest": (user, action: any) => {},
    "server/cancel/friendship": (user, action: any) => {},
    "client/cancel/friendship": (user, action: any) => {},
    "server/accept/frequest": (user, action: any) => {},
    "client/accept/frequest": (user, action: any) => {},
    "server/reject/frequest": (user, action: any) => {},
    "client/reject/frequest": (user, action: any) => {},
    "server/withdraw/frequest": (user, action: any) => {},
    "client/withdraw/frequest": (user, action: any) => {},
    toggleEventsBox: ({events}, {payload}: any) => {       
        if(events.currentEventIndex === payload.eventTypeIndex) {
            events.currentEventIndex = null;
        } else {
            events.currentEventIndex = payload.eventTypeIndex
        }
    },
    "server/conversation/message/send": (user, action: any) => { },
    "client/conversation/message/receive": (user: IUserSlice, action: IMessageAction) => {
        if(user.conversation._id && user.conversation._id === action.payload.conversationId) {
             user.conversation.messages.push({
                 _id: action.payload.newMessage._id,
                 speaker: action.payload.newMessage.speaker,
                 content: action.payload.newMessage.content,
                 dateOfTyping: action.payload.newMessage.dateOfTyping
             });  
             user.conversation.updateSource = EUpdateSource.NEW;
        } else if (!user.lists.conversations.isLoading) {
            for (let i = 0; i < user.lists.conversations.array.length; i++) {
                if(user.lists.conversations.array[i]._id === action.payload.conversationId) {
                    user.lists.conversations.array[i].lastMessage = action.payload.newMessage;
                }
            }
        }
        
        // if we need just the red event/notification
    },
    clearConversationsList: (state, action: any) => {
        state.lists.conversations = initialState.lists.conversations;
    },
    clearConversation: (state, action: any) => {
        state.conversation = initialState.conversation;
    },
    clearFriendsList: (state, action: any) => {
        state.lists.friends = initialState.lists.friends;
    }
};

export default reducers;