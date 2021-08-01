import {configureStore, combineReducers} from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import {createBrowserHistory} from "history";
import createSocketMiddleware from "redux-socket.io";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import io from 'socket.io-client';

import authSlice from './slices/auth/auth';
import portalSlice from './slices/portal/portal';
import profileSlice from './slices/profile/profile';
import userSlice from './slices/user/user';

//import rootSocket from '../sockets/root-socket';
//import userSocket from '../sockets/user-socket';
//import profileSocket from '../sockets/profile-socket';

const history = createBrowserHistory();

const rootSoket = io();
const profileSocket = io('/profile');
const userSocket = io("/user");

const persistConfig: any = {
  key: 'root',
  storage,
  whitelist: ["auth"]
};

const reducers: any = combineReducers({
  auth: authSlice.reducer,
  profile: profileSlice.reducer,
  user: userSlice.reducer, // maybe I don't need it - I can emit events directly without redux through socket just like with room entering
  portal: portalSlice.reducer,
  //@ts-ignore
  router: connectRouter(history)
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({serializableCheck: {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}}),
      createSocketMiddleware(rootSoket,  "/"),
      createSocketMiddleware(profileSocket,  "profile/server"),
      createSocketMiddleware(userSocket,  "user/server"),
  ]
});

const persistor = persistStore(store);

export default store;
export {persistor, rootSoket, profileSocket, userSocket};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;