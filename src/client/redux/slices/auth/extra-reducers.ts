import { logIn, logOut, signUp } from "./thunks";
import { initialState } from "./auth";

import { IAuthSlice } from "../../../interfaces/state/i-auth-slice";

const extraReducers = (builder) => {
    builder.addCase(logIn.fulfilled, (auth: IAuthSlice, action) => {
        if (action.payload?.user?.token) {
            return action.payload.user;
        }
    }),
    builder.addCase(logOut.fulfilled, (auth: IAuthSlice, action) => initialState),
    builder.addCase(signUp.fulfilled, (auth: IAuthSlice, action) => {
        return action.payload.user;
    })
};

export default extraReducers; 