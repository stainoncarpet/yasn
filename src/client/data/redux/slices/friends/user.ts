import { createSlice } from '@reduxjs/toolkit';

import extraReducers from "./extra-reducers";

const initialState = [];

const friendsSlice = createSlice({
    name: 'friends',
    initialState: initialState,
    reducers: {
        "client/message": (state, action: any) => {},
        "server/hello": (state, action: any) => {}
    },
    extraReducers: extraReducers
});

export default friendsSlice;

export {initialState};