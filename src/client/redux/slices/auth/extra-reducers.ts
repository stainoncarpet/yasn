import { logIn, logOut, signUp, resetPassword, setNewPassword, updateAccountData } from "./thunks";
import { initialState } from "./auth";

import { IAuthSlice } from "../../../interfaces/state/i-auth-slice";
import { rootSoket } from "../../configure-store";

const extraReducers = (builder) => {
    builder.addCase(logIn.pending, (auth: IAuthSlice, action) => {
        auth.isLoading = true;
    }),
    builder.addCase(logIn.fulfilled, (auth: IAuthSlice, action) => {
        if (action.payload?.user?.token) {
            rootSoket.emit("check-in-global-room", { token: action.payload?.user?.token });
            return action.payload.user;
        }
        auth.isLoading = false;
    }),
    builder.addCase(logOut.fulfilled, (auth: IAuthSlice, action) => {
        rootSoket.emit("check-out-global-room", { token: auth.token });
        return initialState;
    }),
    builder.addCase(signUp.pending, (auth: IAuthSlice, action) => {
        auth.isLoading = true;
    }),
    builder.addCase(signUp.fulfilled, (auth: IAuthSlice, action) => {
        if (action.payload?.user?.token) {           
            rootSoket.emit("check-in-global-room", { token: action.payload?.user?.token });
            return action.payload.user;
        }
        auth.isLoading = false;
    }),
    builder.addCase(resetPassword.pending, (auth: IAuthSlice, action) => {
        auth.isLoading = true;
    }),
    builder.addCase(resetPassword.fulfilled, (auth: IAuthSlice, action) => {
        auth.isLoading = false;
    }),
    builder.addCase(setNewPassword.pending, (auth: IAuthSlice, action) => {
        auth.isLoading = true;
    }),
    builder.addCase(setNewPassword.fulfilled, (auth: IAuthSlice, action) => {
        auth.isLoading = false;
    }),
    builder.addCase(updateAccountData.fulfilled, (auth: IAuthSlice, action) => {
        auth.fullName = action.payload.user.fullName;
        auth.userName = action.payload.user.userName;
        auth.userName = action.payload.user.userName;
    })
};

export default extraReducers; 