import { logIn, logOut, signUp } from "./thunks";
import { initialState } from "./auth";

import { IAuthSlice } from "../../../interfaces/state/i-auth-slice";
import { rootSoket } from "../../configure-store";

const extraReducers = (builder) => {
    builder.addCase(logIn.fulfilled, (auth: IAuthSlice, action) => {
        if (action.payload?.user?.token) {
            rootSoket.emit("check-in-global-room", { token: action.payload?.user?.token });
            return action.payload.user;
        }
    }),
    builder.addCase(logOut.fulfilled, (auth: IAuthSlice, action) => {
        rootSoket.emit("check-out-global-room", { token: auth.token });
        return initialState;
    }),
    builder.addCase(signUp.fulfilled, (auth: IAuthSlice, action) => {
        if (action.payload?.user?.token) {           
            rootSoket.emit("check-in-global-room", { token: action.payload?.user?.token });
            return action.payload.user;
        }
    })
};

export default extraReducers; 