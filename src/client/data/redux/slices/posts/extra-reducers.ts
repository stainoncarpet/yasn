import { fetchPosts, fetchComments } from './thunks';

const extraReducers = (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      console.log("ACTION PAYLOAD: ", action.payload.posts);

      return action.payload.posts;
    }),
      builder.addCase(fetchComments.fulfilled, (posts: any, action) => {
        console.log("ACTION PAYLOAD: ", action.payload.comments, action.payload.postId);

        const postOfInterest = posts.find((post) => post._id === action.payload.postId);

        const ind = posts.indexOf(postOfInterest);

        posts[ind].comments = action.payload.comments;
      })
  };

  export default extraReducers;