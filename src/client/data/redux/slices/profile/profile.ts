import { createSlice } from '@reduxjs/toolkit';

import extraReducers from './extra-reducers';

const initialState = {
  userInfo: {
    _id: null,
    fullName: null,
    userName: null,
    dateOfBirth: null,
    dateOfRegistration: null,
    avatar: null
  },
  friends: [],
  posts: []
};

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialState,
  reducers: {
    resetProfileData: () => {
      return initialState;
    },
    "server/vote/post": () => {/* all we need is a dispatched action to the server hence empty */ },
    "client/vote/post": ({posts}, action: any) => {
      const postOfInterest: any = posts.find((post: any) => action.voteResult.postId === post._id);

      if (postOfInterest) {
        postOfInterest.likers = action.voteResult.likers;
        postOfInterest.dislikers = action.voteResult.dislikers;
      }
    },
    "server/vote/comment": () => {/* all we need is a dispatched action to the server hence empty */ },
    "client/vote/comment": ({posts}: any, action: any) => {
      const postOfInterest: any = posts.find((post: any) => action.voteResult.postId === post._id);

      if (postOfInterest.areCommentsDisplayed) {
        const ind = posts.indexOf(postOfInterest);
        const commentOfInterest: any = posts[ind].comments.find((comment: any) => action.voteResult.commentId === comment._id);

        if (commentOfInterest) {
          commentOfInterest.likers = action.voteResult.likers;
          commentOfInterest.dislikers = action.voteResult.dislikers;
        }
      }
    },
    "server/create/post": () => {/* all we need is a dispatched action to the server hence empty */ },
    "client/create/post": (state: any, action: any) => { action.post && state.posts.unshift(action.post) },
    "server/create/comment": () => {/* all we need is a dispatched action to the server hence empty */ },
    "client/create/comment": ({posts}: any, action: any) => {
      const postOfInterest: any = posts.find((post: any) => action.comment.postId === post._id);

      if (postOfInterest) {
        const ind = posts.indexOf(postOfInterest);

        if (posts[ind].areCommentsDisplayed) {
          posts[ind].comments.push(action.comment);
        } else {
          posts[ind].comments.push(action.comment.postId);
        }
      }
    },
    "server/delete/comment": () => {/* all we need is a dispatched action to the server hence empty */ },
    "client/delete/comment": (state: any, action: any) => {
      const postOfInterest: any = state.posts.find((post: any) => action.deletedComment.post === post._id);

      if (postOfInterest) {
        postOfInterest.comments = postOfInterest.comments.filter((comment) => comment._id !== action.deletedComment._id);
      }
    },
    "server/delete/post": () => {/* all we need is a dispatched action to the server hence empty */ },
    "client/delete/post": (state: any, action: any) => {
      state.posts = state.posts.filter((post) => post._id !== action.deletedPost._id)
    },
  },
  extraReducers: extraReducers
});

//export const { incremented, decremented } = counterSlice.actions;

export default profileSlice;