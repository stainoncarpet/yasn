import { modelNames } from 'mongoose';
import React from 'react';

const initialState = {
    user: {
        id: null,
        token: null,
        avatar: null
    },
    portal: {
        isShown: false
    }
};

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

const UserContext = React.createContext(initialState);

export {initialState, userReducer}

export default UserContext;