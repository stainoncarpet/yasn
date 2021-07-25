import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: "",
    token: "",
    avatar: ""
}

const userReducer = (state, action) => {
    switch(action.type) {
        case "SET_AUTH":
            return {...state, user: {id: action.id, token: action.token, avatar: action.avatar ? action.avatar : state.user.avatar}};
        case "TOGGLE_PORTAL":
            return {...state, portal: {isShown: !state.portal.isShown}}
        case "REMOVE_AUTH":
            return initialState;
        default:
            return state;
    }
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => { 
        state.id = "ololo"
    },
    resetUser: (state, action) => {

    },
    "client/message": (state, action: any) => {
        console.log("is message reducer ", action.data);
        state.id = action.data;
    },
    "server/hello": (state, action: any) => {
        console.log("client dispatched event to server ", action);
    }
  }
});

//export const { incremented, decremented } = counterSlice.actions;

export default userSlice;