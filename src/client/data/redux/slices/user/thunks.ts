import { createAsyncThunk } from '@reduxjs/toolkit';

const func = createAsyncThunk('auth/login', async ({email, password}: any, thunkAPI) => {  
        const response = await fetch(`http://localhost:3000/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify({
                email,
                password 
            })
          });
        const data = await response.json();

        return data;
    }
);

export {func};