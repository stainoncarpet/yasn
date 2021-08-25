import { initialState } from "./profile";
import { IProfileSlice } from "../../../interfaces/state/i-profile-slice";

const reducers = {
  resetProfileData: (state: IProfileSlice, action: any) => {
    return initialState;
  },
  hideComments: ({posts}: any, action: any) => {
    for(let i = 0; i < posts.length; i++){
      if(action.payload.postId === posts[i]._id) {
        posts[i].areCommentsDisplayed = false;
        break;
      }
    }
  },
  "server/vote/post": (state: IProfileSlice, action: any) => {/* all we need is a dispatched action to the server hence empty */ },
  "client/vote/post": ({ posts }, action: any) => {
    const postOfInterest: any = posts.find((post: any) => action.voteResult.postId === post._id);

    if (postOfInterest) {
      postOfInterest.likers = action.voteResult.likers;
      postOfInterest.dislikers = action.voteResult.dislikers;
    }
  },
  "server/vote/comment": (state: IProfileSlice, action: any) => {/* all we need is a dispatched action to the server hence empty */ },
  "client/vote/comment": ({ posts }: any, action: any) => {
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
  "server/create/post": (state: IProfileSlice, action: any) => {/* all we need is a dispatched action to the server hence empty */ },
  "client/create/post": (state: IProfileSlice, action: any) => { action.post && state.posts.unshift(action.post) },
  "server/create/comment": (state: IProfileSlice, action: any) => {/* all we need is a dispatched action to the server hence empty */ },
  "client/create/comment": ({ posts }: any, action: any) => {
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
  "server/delete/comment": (state: IProfileSlice, action: any) => {/* all we need is a dispatched action to the server hence empty */ },
  "client/delete/comment": (state: IProfileSlice, action: any) => {
    const postOfInterest: any = state.posts.find((post: any) => action.deletedComment.post === post._id);

    if (postOfInterest) {
      postOfInterest.comments = postOfInterest.comments.filter((comment) => comment._id !== action.deletedComment._id);
    }
  },
  "server/delete/post": (state: IProfileSlice, action: any) => {/* all we need is a dispatched action to the server hence empty */ },
  "client/delete/post": (state: IProfileSlice, action: any) => {
    state.posts = state.posts.filter((post) => post._id !== action.deletedPost._id)
  },
  "client/friend/online": (state: IProfileSlice, action: any) => {
    if(state.userInfo._id === action.payload.userId){
      state.userInfo.lastOnline = 0;
    }
  },
  "client/friend/offline": (state: IProfileSlice, action: any) => {
    if(state.userInfo._id === action.payload.userId){
      state.userInfo.lastOnline = action.payload.lastOnline;
    }
  }
}

export default reducers;