import {getEvents, markEventAsRead} from "./thunks";

// user -> events friendRequests, newMessages, unreadNotifications

const extraReducers = (builder) => {
    builder.addCase(getEvents.fulfilled, (user, action) => {
        user.events = {
            friendRequests: action.payload.events.filter(({type}) => type === "frequest-received" || type === "frequest-accepted"),
            newMessages: action.payload.events.filter(({type}) => type === "pmessage-received"),
            unreadNotifications: action.payload.events.filter(({type}) => type === "post-commented"),
        }
    }),
    builder.addCase(markEventAsRead.fulfilled, (user, action) => {
        console.log(action.payload.event.eventId);
        
        if(action.payload.event.isMarked === true){

            if(user.events.friendRequests.some((freq) => freq._id === action.payload.event.eventId)) {
                const newArr = user.events.friendRequests.filter((freq) => freq._id !== action.payload.event.eventId);
                user.events.friendRequests = newArr;
            } else if (user.events.newMessages.some((nm) => nm._id === action.payload.event.eventId)) {
                const newArr = user.events.newMessages.filter((nm) => nm._id !== action.payload.event.eventId);
                user.events.newMessages = newArr;
            } else if (user.events.unreadNotifications.some((uN) => uN._id === action.payload.event.eventId)) {
                const newArr = user.events.unreadNotifications.filter((uN) => uN._id !== action.payload.event.eventId);
                user.events.unreadNotifications = newArr;
            }

        } else {
            console.log("something went wrong with marking event as read");
            
        }
    })
};

export default extraReducers; 