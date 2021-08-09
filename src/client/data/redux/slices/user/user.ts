import { createSlice } from '@reduxjs/toolkit';

import extraReducers from "./extra-reducers";
import reducers from './reducers';

const initialState = {

}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: reducers,
    extraReducers: extraReducers
});

export default userSlice;

export {initialState};