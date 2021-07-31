import { getFriends } from "./thunks";

const extraReducers = (builder) => {
    builder.addCase(getFriends.fulfilled, (state, action) => action.payload.friends && action.payload.friends)
};

export default extraReducers;