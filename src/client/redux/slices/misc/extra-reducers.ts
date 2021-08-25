
import { logIn } from "../auth/thunks";
import { fetchProfile } from '../profile/thunks';

import { ESnackbarType } from "../../../interfaces/state/i-misc-slice";

const extraReducers = (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
      if (action.payload.msg === "FAIL") {
        //@ts-ignore
        state.snackbar = { isShown: true, content: action.payload.reason, type: ESnackbarType.DANGER };
      }
    }),
    builder.addCase(fetchProfile.fulfilled, (state, { payload: { profile, msg, reason } }) => {
        if (!profile) {
          //@ts-ignore
          state.snackbar = { isShown: true, content: reason, type: ESnackbarType.DANGER };
        }
      })
  };

export default extraReducers; 