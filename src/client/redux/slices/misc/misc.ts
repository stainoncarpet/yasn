import { createSlice } from '@reduxjs/toolkit';

import {logIn} from "../auth/thunks";

const initialState = {
    portal: {
      isShown: false
    },
    snackbar: {
      isShown: false,
      content: null,
      type: null
    }
};

const miscSlice = createSlice({
  name: 'misc',
  initialState: initialState,
  reducers: {
    togglePortal: (state, action) => { 
      state.portal.isShown = !state.portal.isShown;
    },
    toggleSnackbar: (state, action) => { 
      state.snackbar.isShown = !state.snackbar.isShown;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      if(action.payload.msg === "FAIL") {
        state.snackbar.isShown = true;
        state.snackbar.content = action.payload.reason;
        //@ts-ignore
        state.snackbar.type = "danger";
      }
  })
  }
});

export default miscSlice;