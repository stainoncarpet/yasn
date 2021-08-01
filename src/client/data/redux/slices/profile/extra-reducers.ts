import { fetchPosts, fetchComments, fetchProfile } from './thunks';

const extraReducers = (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => action.payload.posts),
    builder.addCase(fetchComments.fulfilled, ({posts}: any, action) => {
      const postOfInterest = posts.find((post) => post._id === action.payload.postId);
      const ind = posts.indexOf(postOfInterest);
      posts[ind].comments = action.payload.comments;
      posts[ind].areCommentsDisplayed = true;
    }),
    builder.addCase(fetchProfile.fulfilled, (state, {payload: {profile}}) => {
      console.log(profile);
      
      return ({ userInfo: { 
                          _id: profile._id, 
                          fullName: profile.fullName, 
                          userName: profile.userName, 
                          dateOfBirth: profile.dateOfBirth, 
                          dateOfRegistration: profile.dateOfRegistration, 
                          avatar: profile.avatar,
                          lastOnline: profile.lastOnline,
                        }, 
                friendships: profile.friendships,
                posts: profile.posts });
      })
};

export default extraReducers;