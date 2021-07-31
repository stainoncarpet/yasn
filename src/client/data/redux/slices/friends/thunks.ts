import { createAsyncThunk } from '@reduxjs/toolkit';

const getFriends = createAsyncThunk('user/login', async ({userName}: any, thunkAPI) => {  
        const response = await fetch(`http://localhost:3000/friends?userName=${userName}`);
        const data = await response.json();

        return data;
    }
);

export {getFriends};