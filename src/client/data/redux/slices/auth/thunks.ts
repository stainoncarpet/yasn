import { createAsyncThunk } from '@reduxjs/toolkit';

const logIn = createAsyncThunk('auth/login', async ({email, password}: any, thunkAPI) => {  
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

const logOut = createAsyncThunk('auth/logout', async ({id, token}: any, thunkAPI) => {  
    const response = await fetch(`http://localhost:3000/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify({
            id,
            token 
        })
      });
    const data = await response.json();

    return data;
}
);

const signUp = createAsyncThunk('auth/signup', async ({fullName, userName, country, state, city, dateOfBirth, email, password, avatarBase64String}: any, thunkAPI) => {  
  const response = await fetch(`http://localhost:3000/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify({
        fullName, 
        userName, 
        country, 
        state, 
        city, 
        dateOfBirth,
        email, 
        password, 
        avatarBase64String
      })
    });
  const data = await response.json();

  return data;
}
);

export {logIn, logOut, signUp};