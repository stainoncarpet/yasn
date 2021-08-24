
import { logIn } from "../auth/thunks";
import { fetchProfile } from '../profile/thunks';

const extraReducers = (builder) => {
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
  };

export default extraReducers; 