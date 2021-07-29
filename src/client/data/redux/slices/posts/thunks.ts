import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchPosts = createAsyncThunk('posts/fetch', async ({userName}: any, thunkAPI) => {  
        const response = await fetch(`http://localhost:3000/posts?user=${userName}`);
        const data = await response.json();

        return data;
    }
);

const fetchComments = createAsyncThunk('comments/fetch', async ({postId}: any, thunkAPI) => {
        const response = await fetch(`http://localhost:3000/comments?postId=${postId}`);
        const data = await response.json();

        return data;
    }
);

export {fetchPosts, fetchComments};