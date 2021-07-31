import {configureStore, combineReducers} from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import {createBrowserHistory} from "history";
import createSocketMiddleware from "redux-socket.io";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';

import postsSlice from './slices/posts/posts';
import userSlice from './slices/user/user';
import rootSocket from '../sockets/root-socket';
import postsSocket from '../sockets/posts-socket';
import portalSlice from './slices/portal/portal';
import friendsSlice from './slices/friends/user';

const history = createBrowserHistory();

const persistConfig: any = {
  key: 'root',
  storage,
  whitelist: ["user"]
};

const reducers: any = combineReducers({
  user: userSlice.reducer,
  posts: postsSlice.reducer,
  portal: portalSlice.reducer,
  friends: friendsSlice.reducer,
  //@ts-ignore
  router: connectRouter(history)
});

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({serializableCheck: {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}}),
      createSocketMiddleware(postsSocket, ["user/server", "posts/server"])
  ]
});

const persistor = persistStore(store);

export default store;
export {persistor};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;