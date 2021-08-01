import { createSlice } from '@reduxjs/toolkit';

import extraReducers from "./extra-reducers";

const initialState = {

}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        "server/send/frequest": (state, action: any) => {},
        "client/message": (state, action: any) => {

        }
    },
    extraReducers: extraReducers
});

export default userSlice;

export {initialState};