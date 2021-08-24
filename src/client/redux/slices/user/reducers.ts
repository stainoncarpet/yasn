import { initialState } from "./user";

interface IAction {
    payload: IPayload
}

interface IPayload {
    conversationId: string,
    newMessage: IMessage,
}

interface IMessage {
    _id: string,
    speaker: ISpeaker,
    content: string,
    dateOfTyping: string
}

interface ISpeaker {
    _id: string
}

const reducers = {
    "server/send/frequest": (state, action: any) => {},
    "client/send/frequest": (state, action: any) => {},
    "server/cancel/friendship": (state, action: any) => {},
    "client/cancel/friendship": (state, action: any) => {},
    "server/accept/frequest": (state, action: any) => {},
    "client/accept/frequest": (state, action: any) => {},
    "server/reject/frequest": (state, action: any) => {},
    "client/reject/frequest": (state, action: any) => {},
    "server/withdraw/frequest": (state, action: any) => {},
    "client/withdraw/frequest": (state, action: any) => {},
    toggleEventsBox: ({events}, {payload}: any) => {       
        if(events.currentEventIndex === payload.eventTypeIndex) {
            events.currentEventIndex = null;
        } else {
            events.currentEventIndex = payload.eventTypeIndex
        }
    },
    "server/conversation/message/send": (state, action: any) => { },
    "client/conversation/message/receive": (state, action: IAction) => {
        if(state.conversation._id && state.conversation._id === action.payload.conversationId) {
             state.conversation.messages.push({
                 _id: action.payload.newMessage._id,
                 speaker: action.payload.newMessage.speaker._id,
                 content: action.payload.newMessage.content,
                 dateOfTyping: action.payload.newMessage.dateOfTyping
             });  
        } else if (!state.lists.conversations.isLoading) {
            for (let i = 0; i < state.lists.conversations.array.length; i++) {
                if(state.lists.conversations.array[i]._id === action.payload.conversationId) {
                    state.lists.conversations.array[i].lastMessage = action.payload.newMessage;
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