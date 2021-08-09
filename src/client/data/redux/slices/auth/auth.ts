import { createSlice } from '@reduxjs/toolkit';

import extraReducers from "./extra-reducers";
import reducers from './reducers';

const initialState = {
    _id: null,
    fullName: null,
    userName: null,
    email: null,
    dateOfBirth: null,
    dateOfRegistration: null,
    token: null,
    avatar: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: reducers,
    extraReducers: extraReducers
});

export default authSlice;

export {initialState}; // used to reset state in extraReducers