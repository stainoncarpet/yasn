import { createSlice } from '@reduxjs/toolkit';

import extraReducers from './extra-reducers';

const initialState = [];

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    "server/vote": () => {},
    "client/vote": (state, action: any) => {
      const postOfInterest: any = state.find((post: any) => action.voteResult.postId === post._id);

      if(postOfInterest){
        postOfInterest.likers = action.voteResult.likers;
        postOfInterest.dislikers = action.voteResult.dislikers;
      }
    }
  },
  extraReducers: extraReducers
});

//export const { incremented, decremented } = counterSlice.actions;

export default postsSlice;