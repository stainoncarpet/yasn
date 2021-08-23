import {getUnreadEvents, getDataByType, markEventAsRead, getFriends, startConversation, loadConversation, getConversationsOverview} from "./thunks";

const extraReducers = (builder) => {
    builder.addCase(getUnreadEvents.fulfilled, (user, action) => {
        user.events.friendRequests.requests = action.payload.events.events.filter(({type}) => type === "frequest-received" || type === "frequest-accepted");
        user.events.newMessages.messages = action.payload.events.events.filter(({type}) => type === "pmessage-received");
        user.events.unreadNotifications.notifications = action.payload.events.events.filter(({type}) => type === "post-commented");

        user.events.friendRequests.unreadCount = action.payload.events.unreadFRequestsCount;
        user.events.newMessages.unreadCount = action.payload.events.unreadMessagesCount;
        user.events.unreadNotifications.unreadCount = action.payload.events.unreadNotificationsCount;
    }),
    builder.addCase(markEventAsRead.fulfilled, (user, action) => {
        if(action.payload.event.isMarked === true){
            if(user.events.friendRequests.requests.some((freq) => freq._id === action.payload.event.eventId)) {
                const newArr = user.events.friendRequests.requests.filter((freq) => freq._id !== action.payload.event.eventId);
                user.events.friendRequests.requests = newArr;
                user.events.friendRequests.unreadCount = user.events.friendRequests.unreadCount - 1;

                const newArr2 = user.lists.friends.filter((uN) => uN._id !== action.payload.event.eventId);
                user.lists.friends = newArr2;
            } else if (user.events.newMessages.messages.some((nm) => nm._id === action.payload.event.eventId)) {
                const newArr = user.events.newMessages.messages.filter((nm) => nm._id !== action.payload.event.eventId);
                user.events.newMessages.messages = newArr;
                user.events.newMessages.unreadCount = user.events.newMessages.unreadCount - 1;

                const newArr2 = user.lists.conversations.filter((uN) => uN._id !== action.payload.event.eventId);
                user.lists.conversations = newArr2;
            } else if (user.events.unreadNotifications.notifications.some((uN) => uN._id === action.payload.event.eventId)) {
                const newArr = user.events.unreadNotifications.notifications.filter((uN) => uN._id !== action.payload.event.eventId);
                user.events.unreadNotifications.notifications = newArr;
                user.events.unreadNotifications.unreadCount = user.events.unreadNotifications.unreadCount - 1;

                const newArr2 = user.lists.notifications.filter((uN) => uN._id !== action.payload.event.eventId);
                user.lists.notifications = newArr2;
            }
        } else {
            console.log("something went wrong with marking event as read");
        }
    }),
    builder.addCase(getDataByType.fulfilled, (user, action) => {
        if (action.payload.data.friends) {
            user.lists.friends = action.payload.data.friends
        } else if (action.payload.data.conversations) {
            user.lists.conversations = action.payload.data.conversations
        } else if (action.payload.data.notifications) {
            user.lists.notifications = action.payload.data.notifications
        }
    }),
    builder.addCase(getFriends.fulfilled, (user, action) => {
        if(action.payload.friends){
            user.lists.friends.array = action.payload.friends;
        }
        user.lists.friends.isLoading = false;
    }),
    builder.addCase(startConversation.fulfilled, (user, action) => {}),
    builder.addCase(loadConversation.fulfilled, (user, action) => {
        if(action.payload.conversation) {
            user.conversation = {
                _id: action.payload.conversation._id,
                isLoading: false,
                messages: action.payload.conversation.messages,
                participants: action.payload.conversation.participants
            };
        }
    }),
    builder.addCase(getConversationsOverview.fulfilled, (user, action) => {
        user.lists.conversations = {array: action.payload.conversations, isLoading: false};
    })
};

export default extraReducers; 