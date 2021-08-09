import { createSlice } from '@reduxjs/toolkit';

import extraReducers from './extra-reducers';

import reducers from './reducers';

const initialState = {
  userInfo: {
    _id: null,
    fullName: null,
    userName: null,
    dateOfBirth: null,
    dateOfRegistration: null,
    avatar: null,
    lastOnline: null,
    friendshipStatusWithRequester: null
  },
  friends: {
    totalFriendsCount: null,
    selection: []
  },
  posts: []
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: reducers,
  extraReducers: extraReducers
});

//export const { incremented, decremented } = counterSlice.actions;

export default profileSlice;

export {initialState};