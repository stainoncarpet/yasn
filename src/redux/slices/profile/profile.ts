import { createSlice } from '@reduxjs/toolkit';

import extraReducers from './extra-reducers';

import reducers from './reducers';

import { IProfileSlice } from '../../../interfaces/state/i-profile-slice';

const initialState: IProfileSlice = {
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
  posts: [],
  isLoading: true
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: reducers,
  extraReducers: extraReducers
});

export default profileSlice;

export {initialState};