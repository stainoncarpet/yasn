import { initialState } from "./auth";

const reducers = {
    "client/message": (state, action: any) => {},
    "server/hello": (state, action: any) => {},
    removeClientAuth: (state, action) => {
        return initialState;
    }
};

export default reducers;