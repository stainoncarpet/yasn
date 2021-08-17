import { createSlice } from '@reduxjs/toolkit';

import extraReducers from "./extra-reducers";
import reducers from './reducers';

const initialState = {
    events: {
        friendRequests: {
            requests: [],
            unreadCount: 0
        },
        newMessages: {
            messages: [],
            unreadCount: 0
        },
        unreadNotifications: {
            notifications: [],
            unreadCount: 0
        },
        currentEventIndex: null
    },
    data: {
        friends: {
            isLoading: true,
            array: []
        },
        conversations: {
            isLoading: true,
            array: []
        },
        notifications: {
            isLoading: true,
            array: []
        }
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: reducers,
    extraReducers: extraReducers
});

export default userSlice;

export {initialState};