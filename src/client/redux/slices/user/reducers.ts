import { initialState } from "./user";

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
    "server/conversation/message/send": (state, action: any) => {},
    "client/conversation/message/receive": (state, action: any) => {},
    clearConversationsList: (state, action: any) => {
        state.lists.conversations = initialState.lists.conversations;
    },
    clearConversation: (state, action: any) => {
        state.conversation = initialState.conversation
    }
};

export default reducers;