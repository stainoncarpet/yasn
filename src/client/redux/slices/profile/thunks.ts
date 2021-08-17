import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchPosts = createAsyncThunk('posts/fetch', async ({userName}: any, thunkAPI) => {  
        const response = await fetch(`http://localhost:3000/profile/posts?user=${userName}`);
        const data = await response.json();

        return data;
    }
);

const fetchComments = createAsyncThunk('comments/fetch', async ({postId}: any, thunkAPI) => {
        const response = await fetch(`http://localhost:3000/profile/comments?postId=${postId}`);
        const data = await response.json();

        return data;
    }
);

const fetchProfile = createAsyncThunk('profile/fetch', async ({userName, requesterId}: any, thunkAPI) => {
    const response = await fetch(`http://localhost:3000/profile/user?userName=${userName}&requesterId=${requesterId}`);
    const data = await response.json();

    return data;
}
);

export {fetchPosts, fetchComments, fetchProfile};