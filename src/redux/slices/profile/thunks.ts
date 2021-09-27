import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchPosts = createAsyncThunk('posts/fetch', async ({ userName }: any, thunkAPI) => {
    try {
        const response = await fetch(`/profile/posts?user=${userName}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}
);

const fetchComments = createAsyncThunk('comments/fetch', async ({ postId }: any, thunkAPI) => {
    try {
        const response = await fetch(`/profile/comments?postId=${postId}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}
);

const fetchProfile = createAsyncThunk('profile/fetch', async ({ userName, requesterId }: any, thunkAPI) => {
    try {
        const response = await fetch(`/profile/user?userName=${userName}&requesterId=${requesterId}`);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}
);

export { fetchPosts, fetchComments, fetchProfile };