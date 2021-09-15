
import { logIn } from "../auth/thunks";
import { fetchProfile } from '../profile/thunks';
import { logOut } from "../auth/thunks";
import { resetPassword } from "../auth/thunks";

import { ESnackbarType } from "../../../interfaces/state/i-misc-slice";

const extraReducers = (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      if (action.payload.msg === "FAIL") {
        state.snackbar = { isShown: true, content: action.payload.reason, type: ESnackbarType.DANGER };
      }
    }),
    builder.addCase(logOut.fulfilled, (state, action) => {
      if (action.payload.msg === "FAIL") {
        state.snackbar = { isShown: true, content: action.payload.reason, type: ESnackbarType.DANGER };
      } else {
        state.snackbar = { isShown: true, content: action.payload.reason, type: ESnackbarType.NORMAL };
      }
    }),
    builder.addCase(fetchProfile.fulfilled, (state, { payload: { profile, msg, reason } }) => {
        if (!profile) {
          state.snackbar = { isShown: true, content: reason, type: ESnackbarType.DANGER };
        }
    }),
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      if (action.payload.msg === "OK") {
        state.snackbar = { isShown: true, content: action.payload.reason, type: ESnackbarType.SUCCESS };
      } else {
        state.snackbar = { isShown: true, content: action.payload.reason, type: ESnackbarType.DANGER };
      }
  })
  };

export default extraReducers; 