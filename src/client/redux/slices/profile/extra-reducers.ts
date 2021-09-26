import { fetchPosts, fetchComments, fetchProfile } from './thunks';
import { sendFriendRequest, cancelFriendship, acceptFriendRequest, rejectFriendRequest, withdrawFriendRequest} from '../user/thunks';

import { IProfileSlice, IUser, IFriendshipStatus, EFriendshipStatus } from '../../../interfaces/state/i-profile-slice';

import { INotification } from "../user/action-types";
import {IFRequestAcceptActionResult} from "../user/action-types";

interface IFriendRequestActionResult {
  type: string,
  payload: {
    msg: string,
    targetUserId: string,
    notification: INotification,
    requester: {
      user: IUser,
      friendshipStatus: IFriendshipStatus
    }
  }
}

const extraReducers = (builder) => {
  builder.addCase(fetchPosts.fulfilled, (state: IProfileSlice, action) => action.payload.posts),
    builder.addCase(fetchComments.fulfilled, ({ posts }: any, action) => {
      const postOfInterest = posts.find((post) => post._id === action.payload.postId);
      const ind = posts.indexOf(postOfInterest);
      posts[ind].comments = action.payload.comments;
      posts[ind].areCommentsDisplayed = true;
    }),
    builder.addCase(fetchProfile.fulfilled, (state: IProfileSlice, { payload: { profile } }) => {
      if (profile) {
        return {
          userInfo: {
            _id: profile.userInfo._id,
            fullName: profile.userInfo.fullName,
            userName: profile.userInfo.userName,
            dateOfBirth: profile.userInfo.dateOfBirth,
            dateOfRegistration: profile.userInfo.dateOfRegistration,
            avatar: profile.userInfo.avatar,
            lastOnline: profile.userInfo.lastOnline,
            friendshipStatusWithRequester: profile.userInfo.friendshipStatusWithRequester
          },
          posts: profile.posts,
          isLoading: false
        };
      }
    }),
    builder.addCase(sendFriendRequest.fulfilled, (profile: IProfileSlice, action: IFriendRequestActionResult) => {
      console.log(action);

      if (action.payload.msg === "OK" && profile.userInfo._id === action.payload.targetUserId) {
        profile.userInfo.friendshipStatusWithRequester = action.payload.requester.friendshipStatus;
      }
    }),
    builder.addCase(cancelFriendship.fulfilled, (profile: IProfileSlice, action) => {
      console.log(action);

      if(action.payload.msg === "OK") {
        profile.userInfo.friendshipStatusWithRequester = null;
      }
    }),
    builder.addCase(acceptFriendRequest.fulfilled, (profile: IProfileSlice, action: IFRequestAcceptActionResult) => {
      console.log(action); 

      if(action.payload.msg === "OK") {
        if(!profile.isLoading && profile.userInfo.friendshipStatusWithRequester) {
          profile.userInfo.friendshipStatusWithRequester.status = EFriendshipStatus.FRIENDS;
        }
      }
    }),
    builder.addCase(rejectFriendRequest.fulfilled, (profile: IProfileSlice, action) => {
      console.log(action);

      if(action.payload.msg === "OK") {
        profile.userInfo.friendshipStatusWithRequester = null;
      }
    }),
    builder.addCase(withdrawFriendRequest.fulfilled, (profile: IProfileSlice, action) => {
      console.log(action);

      if(action.payload.msg === "OK") {
        profile.userInfo.friendshipStatusWithRequester = null;
      }
    })
};

export default extraReducers;

