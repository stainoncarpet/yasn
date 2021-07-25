import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const fetchPosts = createAsyncThunk('posts/fetch', async () => {
    const response = await fetch("http://localhost:3000/posts");
    const data = await response.json();
    
    return data;
  }
);

const fetchComments = createAsyncThunk('comments/fetch', async (postId) => {
  const response = await fetch(`http://localhost:3000/comments?postId=${postId}`);
  const data = await response.json();
  
  return data;
}
);

const initialState = [];

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    setPosts: (state, action) => { },
  },
  extraReducers: (builder) => {
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
  }, 
});

//export const { incremented, decremented } = counterSlice.actions;

export default postsSlice;
export {fetchPosts, fetchComments};