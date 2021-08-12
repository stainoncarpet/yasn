import {getUnreadEvents, getDataByType, markEventAsRead} from "./thunks";

// user -> events friendRequests.requests, newMessages, unreadNotifications.notifications

const extraReducers = (builder) => {
    builder.addCase(getUnreadEvents.fulfilled, (user, action) => {
        console.log(action);
        
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
            } else if (user.events.newMessages.messages.some((nm) => nm._id === action.payload.event.eventId)) {
                const newArr = user.events.newMessages.messages.filter((nm) => nm._id !== action.payload.event.eventId);
                user.events.newMessages.messages = newArr;
            } else if (user.events.unreadNotifications.notifications.some((uN) => uN._id === action.payload.event.eventId)) {
                const newArr = user.events.unreadNotifications.notifications.filter((uN) => uN._id !== action.payload.event.eventId);
                user.events.unreadNotifications.notifications = newArr;
            }
        } else {
            console.log("something went wrong with marking event as read");
        }
    }),
    builder.addCase(getDataByType.fulfilled, (user, action) => {
        if (action.payload.data.friends) {
            user.data.friends = action.payload.data.friends
        } else if (action.payload.data.conversations) {
            user.data.conversations = action.payload.data.conversations
        } else if (action.payload.data.notifications) {
            user.data.notifications = action.payload.data.notifications
        }
    })
};

export default extraReducers; 