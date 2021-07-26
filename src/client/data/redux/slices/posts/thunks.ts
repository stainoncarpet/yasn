import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchPosts = createAsyncThunk('posts/fetch', async (_, thunkAPI) => {
        const response = await fetch("http://localhost:3000/posts");
        const data = await response.json();

        return data;
    }
);

const fetchComments = createAsyncThunk('comments/fetch', async (postId, thunkAPI) => {
        const response = await fetch(`http://localhost:3000/comments?postId=${postId}`);
        const data = await response.json();

        return data;
    }
);

export {fetchPosts, fetchComments};