import { logIn, logOut, signUp } from "./thunks";
import { initialState } from "./user";

const extraReducers = (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => action.payload.user && action.payload.user),
    builder.addCase(logOut.fulfilled, (user, action) => initialState),
    builder.addCase(signUp.fulfilled, (user, action) => {
        return action.payload.user;
    })
};

export default extraReducers;