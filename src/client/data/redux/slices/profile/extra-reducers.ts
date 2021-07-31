import { fetchPosts, fetchComments, fetchProfile } from './thunks';

const extraReducers = (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => action.payload.posts),
    builder.addCase(fetchComments.fulfilled, ({posts}: any, action) => {
      const postOfInterest = posts.find((post) => post._id === action.payload.postId);
      const ind = posts.indexOf(postOfInterest);
      posts[ind].comments = action.payload.comments;
      posts[ind].areCommentsDisplayed = true;
    }),
    builder.addCase(fetchProfile.fulfilled, (state, {payload}) => (
      { userInfo: { _id: payload._id, ullName: payload.fullName, userName: payload.userName, dateOfBirth: payload.dateOfBirth, dateOfRegistration: payload.dateOfRegistration, avatar: payload.avatar}, 
        friends: payload.friends, 
        posts: payload.posts }
    ))
};

export default extraReducers;