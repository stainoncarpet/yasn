import { logIn, logOut, signUp } from "./thunks";
import { initialState } from "./auth";

const extraReducers = (builder) => {
    builder.addCase(logIn.fulfilled, (state, action) => {
        console.log(action);
        
        if (action.payload?.user?.token) {
            return action.payload.user;
        } else {
            console.log("login failed ", action.payload);
        }
    }),
    builder.addCase(logOut.fulfilled, (user, action) => initialState),
    builder.addCase(signUp.fulfilled, (user, action) => {
        return action.payload.user;
    })
};

export default extraReducers; 