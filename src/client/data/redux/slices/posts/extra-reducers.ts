import { fetchPosts, fetchComments } from './thunks';

const extraReducers = (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => action.payload.posts),
    builder.addCase(fetchComments.fulfilled, (posts: any, action) => {
      const postOfInterest = posts.find((post) => post._id === action.payload.postId);
      const ind = posts.indexOf(postOfInterest);
      posts[ind].comments = action.payload.comments;
    })
};

export default extraReducers;