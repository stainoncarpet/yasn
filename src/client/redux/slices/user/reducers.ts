import { initialState } from "./user";

import { IMessageAction } from "../../../interfaces/actions/i-message-action";
import { IUserSlice, EUpdateSource } from "../../../interfaces/state/i-user-slice";
import { IFRequestReceiveActionResult, IFRequestAcceptActionResult, ITypingEventActionResult } from "./action-types";

const reducers = {
    "client/receive/frequest": (user: IUserSlice, action: IFRequestReceiveActionResult) => {
        if (action.payload?.notification) {
            user.events.friendRequests.array = [...user.events.friendRequests.array, action.payload.notification]
            user.events.friendRequests.unreadCount = user.events.friendRequests.unreadCount + 1;
        }

        // if (!user.lists.friends.isLoading && user.lists.friends.array.length < 10) {
        //     user.lists.friends.array = [...user.lists.friends.array, {
        //         user: action.payload?.requester?.user,
        //         friendshipStatus: action.payload?.requester?.friendshipStatus
        //     }]
        // }
    },
    "client/cancel/friendship": (user: IUserSlice, action: any) => {
        if (action.payload.notification) {
            user.events.unreadNotifications.array = [...user.events.unreadNotifications.array, action.payload.notification];
            user.events.unreadNotifications.unreadCount = user.events.unreadNotifications.unreadCount + 1;
        }
    },
    "client/accept/frequest": (user: IUserSlice, action: IFRequestAcceptActionResult) => {
        if (action.payload.notification) {
            user.events.unreadNotifications.array = [...user.events.unreadNotifications.array, action.payload.notification];
            user.events.unreadNotifications.unreadCount = user.events.unreadNotifications.unreadCount + 1;
        }

        // if(!user.lists.friends.isLoading && user.lists.friends.array.length < 10) {
        //     for (let i = 0; i < user.lists.friends.array.length; i++) {
        //         console.log(user.lists.friends.array[i].friendshipStatus.fshipId, " vs ", action.payload.newFriend?.fshipId);

        //         if(user.lists.friends.array[i].friendshipStatus.fshipId === action.payload.newFriend?.fshipId) {
        //             console.log(1);

        //             user.lists.friends.array[i].friendshipStatus.status = action.payload.newFriend?.fshipStatus;
        //             break;
        //         } 
        //     }
        // }
    },
    "client/reject/frequest": (user: IUserSlice, action: any) => {
        if (action.payload.notification) {
            user.events.unreadNotifications.array = [...user.events.unreadNotifications.array, action.payload.notification];
            user.events.unreadNotifications.unreadCount = user.events.unreadNotifications.unreadCount + 1;
        }
    },
    "client/withdraw/frequest": (user: IUserSlice, action: any) => {
        if (action.payload.removableNotificationId) {
            user.events.friendRequests.array = user.events.friendRequests.array.filter((notification) => {
                if (notification._id !== action.payload.removableNotificationId) {
                    return notification;
                } else {
                    user.events.friendRequests.unreadCount = user.events.friendRequests.unreadCount - 1;
                }
            });
        }
    },
    toggleEventsBox: ({ events }: IUserSlice, { payload }: any) => {
        if (events.currentEventIndex === payload.eventTypeIndex) {
            events.currentEventIndex = null;
        } else {
            events.currentEventIndex = payload.eventTypeIndex
        }
    },
    "server/conversation/message/send": (user: IUserSlice, action: any) => { },
    "client/conversation/message/receive": (user: IUserSlice, action: IMessageAction) => {
        if (user.conversation._id && user.conversation._id === action.payload.conversationId) {
            user.conversation.messages.unshift({
                _id: action.payload.newMessage._id,
                speaker: action.payload.newMessage.speaker,
                content: action.payload.newMessage.content,
                dateOfTyping: action.payload.newMessage.dateOfTyping,
                isReadBy: action.payload.newMessage.isReadBy
            });
            user.conversation.updateSource = EUpdateSource.NEW;
        } else if (!user.lists.conversations.isLoading) {
            for (let i = 0; i < user.lists.conversations.array.length; i++) {
                if (user.lists.conversations.array[i]._id === action.payload.conversationId) {
                    user.lists.conversations.array[i].lastMessage = {
                        _id: action.payload.newMessage._id,
                        speaker: action.payload.newMessage.speaker,
                        content: action.payload.newMessage.content,
                        dateOfTyping: action.payload.newMessage.dateOfTyping,
                        isUnRead: true
                    }
                }
            }
        }
    },
    "server/conversation/message/read": (user: IUserSlice, action: any) => { },
    "client/conversation/message/read": (user: IUserSlice, action: { payload: { readerId: string, messageIds: Array<any>, conversationId: string } }) => {
        if (user.conversation._id === action.payload.conversationId) {
            for (let i = 0; i < user.conversation.messages.length; i++) {
                if (action.payload.messageIds.includes(user.conversation.messages[i]._id)) {
                    user.conversation.messages[i].isReadBy = [...user.conversation.messages[i].isReadBy, action.payload.readerId];
                }
            }
        }
    },
    clearConversationsList: (state: IUserSlice, action: any) => {
        state.lists.conversations = initialState.lists.conversations;
    },
    clearConversation: (state: IUserSlice, action: any) => {
        state.conversation = initialState.conversation;
    },
    clearFriendsList: (state: IUserSlice, action: any) => {
        state.lists.friends = initialState.lists.friends;
    },
    resetUserData: (state: IUserSlice, action: any) => {
        return initialState;
    },
    "server/conversation/message/start-typing": (user: IUserSlice, action: any) => { },
    "client/conversation/message/start-typing": (user: IUserSlice, action: ITypingEventActionResult) => {
        if (user.conversation._id && user.conversation._id === action.payload.conversationId) {
            user.conversation.typingUsersExceptCurrent = [...user.conversation.typingUsersExceptCurrent, action.payload.typingUser];
        } else if (!user.lists.conversations.isLoading) {
            for (let i = 0; i < user.lists.conversations.array.length; i++) {
                if (user.lists.conversations.array[i]._id === action.payload.conversationId) {
                    user.lists.conversations.array[i].typingUsers = user.lists.conversations.array[i].typingUsers
                        ? [...user.lists.conversations.array[i].typingUsers, action.payload.typingUser]
                        : [action.payload.typingUser];

                    break;
                }
            }
        }
    },
    "server/conversation/message/stop-typing": (user: IUserSlice, action: any) => { },
    "client/conversation/message/stop-typing": (user: IUserSlice, action: ITypingEventActionResult) => {
        if (user.conversation._id && user.conversation._id === action.payload.conversationId) {
            user.conversation.typingUsersExceptCurrent = user.conversation.typingUsersExceptCurrent.filter((u) => u._id !== action.payload.typingUser._id);
        } else if (!user.lists.conversations.isLoading) {
            
            for (let i = 0; i < user.lists.conversations.array.length; i++) {
                if (user.lists.conversations.array[i]._id === action.payload.conversationId) {
                    
                    if(user.lists.conversations.array[i].typingUsers.length === 1) {
                        delete user.lists.conversations.array[0].typingUsers;
                    }

                    break;
                }
            }
        }
    }
};

export default reducers;