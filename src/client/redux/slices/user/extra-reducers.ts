import { getUnreadEvents, getDataByType, markEventAsRead, getFriends, startConversation, loadConversation, loadMoreMessages, getConversationsOverview, cancelFriendship, rejectFriendRequest, withdrawFriendRequest, acceptFriendRequest } from "./thunks";

import { IUserSlice, EUpdateSource } from "../../../interfaces/state/i-user-slice";
import { EFriendshipStatus } from "../../../interfaces/state/i-profile-slice";

interface IGetDataByTypeAction {
    payload: {
        data: {
            friends: any[],
            conversations: any[],
            notifications: []
        }
    }
}

interface IFriendshipAction {
    payload: {
        msg: string,
        fshipId: string
    }
}

const extraReducers = (builder) => {
    builder.addCase(getUnreadEvents.fulfilled, (user: IUserSlice, action) => {
        user.events.friendRequests.array = action.payload.events.events.filter(({ type }) => type === "frequest-received");
        user.events.newMessages.array = action.payload.events.events.filter(({ type }) => type === "pmessage-received");
        user.events.unreadNotifications.array = action.payload.events.events.filter(({ type }) => type === "post-commented" || type === "frequest-accepted");

        user.events.friendRequests.unreadCount = action.payload.events.unreadFRequestsCount;
        user.events.newMessages.unreadCount = action.payload.events.unreadMessagesCount;
        user.events.unreadNotifications.unreadCount = action.payload.events.unreadNotificationsCount;
    }),
        builder.addCase(markEventAsRead.fulfilled, (user: IUserSlice, action) => {
            if (action.payload.event.isMarked === true) {
                if (user.events.friendRequests.array.some((freq) => freq._id === action.payload.event.eventId)) {
                    const newArr = user.events.friendRequests.array.filter((freq) => freq._id !== action.payload.event.eventId);
                    user.events.friendRequests.array = newArr;
                    user.events.friendRequests.unreadCount = user.events.friendRequests.unreadCount - 1;

                    const newArr2 = user.lists.friends.array.filter((uN) => uN._id !== action.payload.event.eventId);
                    user.lists.friends.array = newArr2;
                } else if (user.events.newMessages.array.some((nm) => nm._id === action.payload.event.eventId)) {
                    const newArr = user.events.newMessages.array.filter((nm) => nm._id !== action.payload.event.eventId);
                    user.events.newMessages.array = newArr;
                    user.events.newMessages.unreadCount = user.events.newMessages.unreadCount - 1;

                    const newArr2 = user.lists.conversations.array.filter((uN) => uN._id !== action.payload.event.eventId);
                    user.lists.conversations.array = newArr2;
                } else if (user.events.unreadNotifications.array.some((uN) => uN._id === action.payload.event.eventId)) {
                    const newArr = user.events.unreadNotifications.array.filter((uN) => uN._id !== action.payload.event.eventId);
                    user.events.unreadNotifications.array = newArr;
                    user.events.unreadNotifications.unreadCount = user.events.unreadNotifications.unreadCount - 1;

                    const newArr2 = user.lists.notifications.array.filter((uN) => uN._id !== action.payload.event.eventId);
                    user.lists.notifications.array = newArr2;
                }
            } else {
                console.log("something went wrong with marking event as read");
            }
        }),
        builder.addCase(getDataByType.fulfilled, (user: IUserSlice, action: IGetDataByTypeAction) => {
            console.log(action);

            if (action.payload.data.friends) {
                user.lists.friends.array = action.payload.data.friends;
                user.lists.friends.isLoading = false;
            } else if (action.payload.data.conversations) {
                user.lists.conversations.array = action.payload.data.conversations;
                user.lists.conversations.isLoading = false;
            } else if (action.payload.data.notifications) {
                user.lists.notifications.array = action.payload.data.notifications;
                user.lists.notifications.isLoading = false;
            }
        }),
        builder.addCase(getFriends.fulfilled, (user: IUserSlice, action) => {
            if (action.payload.friends) {
                user.lists.friends.array = action.payload.friends;
            }
            user.lists.friends.isLoading = false;
        }),
        builder.addCase(startConversation.fulfilled, (user: IUserSlice, action) => { }),
        builder.addCase(loadConversation.fulfilled, (user: IUserSlice, action) => {
            if (action.payload.conversation) {
                user.conversation = {
                    _id: action.payload.conversation._id,
                    isLoading: false,
                    updateSource: user.conversation.updateSource,
                    messages: action.payload.conversation.messages,
                    participants: action.payload.conversation.participants,
                    typingUsersExceptCurrent: user.conversation.typingUsersExceptCurrent
                };
            }
        }),
        builder.addCase(getConversationsOverview.fulfilled, (user: IUserSlice, action) => {
            user.lists.conversations = { array: action.payload.conversations, isLoading: false };
        }),
        builder.addCase(loadMoreMessages.pending, (user: IUserSlice, action) => {
            user.conversation.isLoading = true;
        }),
        builder.addCase(loadMoreMessages.fulfilled, (user: IUserSlice, action) => {
            user.conversation.isLoading = false;

            if (action.payload.moreMessages) {
                user.conversation.messages = [...user.conversation.messages, ...action.payload.moreMessages];
                user.conversation.updateSource = EUpdateSource.OLD;
            } else {
                console.log("failed to load more messages");
            }
        }),
        builder.addCase(cancelFriendship.fulfilled, (user: IUserSlice, action: IFriendshipAction) => {
            console.log(action.payload);

            if (action.payload.msg === "OK" && !user.lists.friends.isLoading) {
                const newArr = new Array();

                for (let index = 0; index < user.lists.friends.array.length; index++) {
                    if(user.lists.friends.array[index].friendshipStatus.fshipId !== action.payload.fshipId){
                        newArr.push(user.lists.friends.array[index]);
                    }
                }
                user.lists.friends.array = newArr;
            }
        }),
        builder.addCase(rejectFriendRequest.fulfilled, (user: IUserSlice, action: IFriendshipAction) => {
            console.log(action.payload);

            if (action.payload.msg === "OK" && !user.lists.friends.isLoading) {
                const newArr = new Array();

                for (let index = 0; index < user.lists.friends.array.length; index++) {
                    if(user.lists.friends.array[index].friendshipStatus.fshipId !== action.payload.fshipId){
                        newArr.push(user.lists.friends.array[index]);
                    }
                }
                user.lists.friends.array = newArr;
            }
        }),
        builder.addCase(withdrawFriendRequest.fulfilled, (user: IUserSlice, action: IFriendshipAction) => {
            console.log(action.payload);

            if (action.payload.msg === "OK" && !user.lists.friends.isLoading) {
                const newArr = new Array();

                for (let index = 0; index < user.lists.friends.array.length; index++) {
                    if(user.lists.friends.array[index].friendshipStatus.fshipId !== action.payload.fshipId){
                        newArr.push(user.lists.friends.array[index]);
                    }
                }
                user.lists.friends.array = newArr;
            }
        }), 
        builder.addCase(acceptFriendRequest.fulfilled, (user: IUserSlice, action: IFriendshipAction) => {
            console.log(action.payload);

            if(action.payload.msg === "OK" && !user.lists.friends.isLoading){
                for (let index = 0; index < user.lists.friends.array.length; index++) {
                    if(user.lists.friends.array[index].friendshipStatus.fshipId === action.payload.fshipId) {
                        user.lists.friends.array[index].friendshipStatus.status = EFriendshipStatus.FRIENDS;
                        break;
                    }
                }
            }
        })
};

export default extraReducers;