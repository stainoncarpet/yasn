import { createSlice } from '@reduxjs/toolkit';

import extraReducers from "./extra-reducers";
import reducers from './reducers';

import { IUserSlice, EUpdateSource } from '../../../interfaces/state/i-user-slice';

const initialState: IUserSlice = {
    events: {
        friendRequests: {
            array: [],
            unreadCount: 0
        },
        newMessages: {
            array: [],
            unreadCount: 0
        },
        unreadNotifications: {
            array: [],
            unreadCount: 0
        },
        latestFeed: {
            array: [],
            unreadCount: 0
        },
        currentEventIndex: null
    },
    lists: {
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
        },
        feed: {
            isLoading: true,
            array: []
        }
    },
    conversation: {
        _id: null,
        isLoading: true,
        updateSource: EUpdateSource.NEW,
        messages: [],
        participants: [],
        typingUsersExceptCurrent: []
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