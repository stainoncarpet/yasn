import {configureStore} from '@reduxjs/toolkit';
import { connectRouter } from 'connected-react-router';
import {createBrowserHistory} from "history";
import createSocketMiddleware from "redux-socket.io";

import postsSlice from './slices/posts/posts';
import userSlice from './slices/user/user';
import rootSocket from '../sockets/root-socket';
import postsSocket from '../sockets/posts-socket';

const history = createBrowserHistory();

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    posts: postsSlice.reducer,
    //@ts-ignore
    router: connectRouter(history),
  }, 
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(),
      createSocketMiddleware(postsSocket, ["user/server", "posts/server"])
  ]
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;