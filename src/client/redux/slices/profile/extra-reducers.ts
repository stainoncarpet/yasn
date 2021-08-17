import { fetchPosts, fetchComments, fetchProfile } from './thunks';

const extraReducers = (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => action.payload.posts),
    builder.addCase(fetchComments.fulfilled, ({ posts }: any, action) => {
      const postOfInterest = posts.find((post) => post._id === action.payload.postId);
      const ind = posts.indexOf(postOfInterest);
      posts[ind].comments = action.payload.comments;
      posts[ind].areCommentsDisplayed = true;
    }),
    builder.addCase(fetchProfile.fulfilled, (state, { payload: { profile } }) => {
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
        friends: {
          totalFriendsCount: profile.friends.totalFriendsCount,
          selection: profile.friends.selection
        },
        posts: profile.posts,
        isLoading: false
      };
    })
};

export default extraReducers;