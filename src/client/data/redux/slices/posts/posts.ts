import { createSlice } from '@reduxjs/toolkit';

import extraReducers from './extra-reducers';

const initialState = [];

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    resetPosts: () => {
      return initialState;
    },
    "server/vote/post": () => {/* all we need is a dispatched action to the server hence empty */},
    "client/vote/post": (state, action: any) => {
      const postOfInterest: any = state.find((post: any) => action.voteResult.postId === post._id);

      if(postOfInterest){
        postOfInterest.likers = action.voteResult.likers;
        postOfInterest.dislikers = action.voteResult.dislikers;
      }
    },
    "server/vote/comment": () => {/* all we need is a dispatched action to the server hence empty */},
    "client/vote/comment": (state: any, action: any) => {
      const postOfInterest: any = state.find((post: any) => action.voteResult.postId === post._id);
      
      if(postOfInterest.areCommentsDisplayed){
        const ind = state.indexOf(postOfInterest);
        const commentOfInterest: any = state[ind].comments.find((comment: any) => action.voteResult.commentId === comment._id);

        if (commentOfInterest){
          commentOfInterest.likers = action.voteResult.likers;
          commentOfInterest.dislikers = action.voteResult.dislikers;
        }
      }
    },
    "server/create/post": () => {/* all we need is a dispatched action to the server hence empty */},
    "client/create/post": (state: any, action: any) => {
      state.unshift(action.post)
    },
    "server/create/comment": () => {/* all we need is a dispatched action to the server hence empty */},
    "client/create/comment": (state: any, action: any) => {
      const postOfInterest: any = state.find((post: any) => action.comment.postId === post._id);

      if (postOfInterest) {
        const ind = state.indexOf(postOfInterest);

        if(state[ind].areCommentsDisplayed) {
          state[ind].comments.push(action.comment);
        } else {
          state[ind].comments.push(action.comment.postId);
        }
      }
    },
    "server/delete/comment": () => {/* all we need is a dispatched action to the server hence empty */},
    "client/delete/comment": (state: any, action: any) => {
      const postOfInterest: any = state.find((post: any) => action.deletedComment.post === post._id);

      if(postOfInterest){
        postOfInterest.comments = postOfInterest.comments.filter((comment) => comment._id !== action.deletedComment._id);
      }
    },
  },
  extraReducers: extraReducers
});

//export const { incremented, decremented } = counterSlice.actions;

export default postsSlice;