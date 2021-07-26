import { createSlice } from '@reduxjs/toolkit';

import extraReducers from './extra-reducers';

const initialState = [];

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    "server/vote/post": () => {/* all we need is a dispatched action to the server hence empty */},
    "client/vote/post": (state, action: any) => {
      const postOfInterest: any = state.find((post: any) => action.voteResult.postId === post._id);

      if(postOfInterest){
        postOfInterest.likers = action.voteResult.likers;
        postOfInterest.dislikers = action.voteResult.dislikers;
      }
    },
    "server/vote/comment": () => {/* all we need is a dispatched action to the server hence empty */},
    "client/vote/comment": (state, action: any) => {
      const postOfInterest: any = state.find((post: any) => action.voteResult.postId === post._id);
      
      
      // if comments are displayed
      if(postOfInterest && typeof postOfInterest.comments[0] === 'object'){
        //@ts-ignore
        const ind = state.indexOf(postOfInterest);
        //@ts-ignore
        const commentOfInterest: any = state[ind].comments.find((comment: any) => action.voteResult.commentId === comment._id);

        if (commentOfInterest){
          commentOfInterest.likers = action.voteResult.likers;
          commentOfInterest.dislikers = action.voteResult.dislikers;
        }
      }
    }
  },
  extraReducers: extraReducers
});

//export const { incremented, decremented } = counterSlice.actions;

export default postsSlice;