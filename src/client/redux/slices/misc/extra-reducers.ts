
import { logIn, updateAccountData } from "../auth/thunks";
import { fetchProfile } from '../profile/thunks';
import { logOut } from "../auth/thunks";
import { resetPassword, setNewPassword } from "../auth/thunks";

import { ESnackbarType, IMiscSlice } from "../../../interfaces/state/i-misc-slice";
import { initialState } from "./misc";

const extraReducers = (builder) => {
    builder.addCase(logIn.fulfilled, (state: IMiscSlice, action) => {
      if (action.payload.msg === "FAIL") {
        state.snackbar = { isShown: true, content: action.payload.reason, type: ESnackbarType.DANGER };
      }
    }),
    builder.addCase(logOut.fulfilled, (state: IMiscSlice, action) => {
      if (action.payload.msg === "FAIL") {
        state.snackbar = { isShown: true, content: action.payload.reason, type: ESnackbarType.DANGER };
      } else {
        state.snackbar = { isShown: true, content: action.payload.reason, type: ESnackbarType.NORMAL };
      }
    }),
    builder.addCase(fetchProfile.fulfilled, (state: IMiscSlice, { payload: { profile, msg, reason } }) => {
        if (!profile) {
          state.snackbar = { isShown: true, content: reason, type: ESnackbarType.DANGER };
        }
    }),
    builder.addCase(resetPassword.fulfilled, (state: IMiscSlice, action) => {
      if (action.payload.msg === "OK") {
        state.snackbar = { isShown: true, content: action.payload.reason, type: ESnackbarType.SUCCESS };
      } else {
        state.snackbar = { isShown: true, content: action.payload.reason, type: ESnackbarType.DANGER };
      }
    }),
    builder.addCase(setNewPassword.fulfilled, (state: IMiscSlice, action) => {
      if (action.payload.msg === "OK") {
        state.snackbar = { isShown: true, content: action.payload.reason, type: ESnackbarType.SUCCESS };
        state.portal = initialState.portal;
      } else {
        state.snackbar = { isShown: true, content: action.payload.reason, type: ESnackbarType.DANGER };
      }
    }),
    builder.addCase(updateAccountData.fulfilled, (state: IMiscSlice, action) => {     
      if (action.payload.msg === "OK") {
        state.snackbar = { isShown: true, content: action.payload.reason, type: ESnackbarType.SUCCESS };
      } else {
        state.snackbar = { isShown: true, content: action.payload.reason, type: ESnackbarType.DANGER };
      }
    })
  };

export default extraReducers; 