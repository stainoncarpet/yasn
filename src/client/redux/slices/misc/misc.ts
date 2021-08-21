import { createSlice } from '@reduxjs/toolkit';

import { logIn } from "../auth/thunks";
import { fetchProfile } from '../profile/thunks';

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
      if(state.snackbar.isShown){
        state.snackbar = initialState.snackbar;
      } else {
        state.snackbar.isShown = !state.snackbar.isShown;
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      if (action.payload.msg === "FAIL") {
        //@ts-ignore
        state.snackbar = { isShown: true, content: action.payload.reason, type: "danger" };
      }
    }),
    builder.addCase(fetchProfile.fulfilled, (state, { payload: { profile, msg, reason } }) => {
        if (!profile) {
          //@ts-ignore
          state.snackbar = { isShown: true, content: reason, type: "danger" };
        }
      })
  }
});

export default miscSlice;