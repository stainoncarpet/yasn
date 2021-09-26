import {configureStore, combineReducers} from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import {createBrowserHistory} from "history";
import createSocketMiddleware from "redux-socket.io";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import io from 'socket.io-client';

import authSlice from './slices/auth/auth';
import miscSlice from './slices/misc/misc';
import profileSlice from './slices/profile/profile';
import userSlice from './slices/user/user';

const history = createBrowserHistory();

const rootSoket = io();
const profileSocket = io('/profile');
const userSocket = io("/user");

// const rootPersistConfig: any = {
//   key: 'root',
//   storage,
//   whitelist: ["auth"]
// };

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: ['isLoading']
}

const reducers: any = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice.reducer),
  profile: profileSlice.reducer,
  user: userSlice.reducer,
  misc: miscSlice.reducer,
  //@ts-ignore
  router: connectRouter(history)
});

//const persistedReducer = persistReducer(rootPersistConfig, reducers);

const store = configureStore({
  //reducer: persistedReducer,
  reducer: reducers,
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