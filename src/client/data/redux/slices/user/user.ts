import { createSlice } from '@reduxjs/toolkit';

import extraReducers from "./extra-reducers";

const initialState = {

}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        "server/send/frequest": (state, action: any) => {},
        "client/send/frequest": (state, action: any) => {},
        "server/cancel/friendship": (state, action: any) => {},
        "client/cancel/friendship": (state, action: any) => {},
        "server/accept/frequest": (state, action: any) => {},
        "client/accept/frequest": (state, action: any) => {},
        "server/reject/frequest": (state, action: any) => {},
        "client/reject/frequest": (state, action: any) => {},
        "server/withdraw/frequest": (state, action: any) => {},
        "client/withdraw/frequest": (state, action: any) => {}
    },
    extraReducers: extraReducers
});

export default userSlice;

export {initialState};