import { createAsyncThunk } from '@reduxjs/toolkit';

const logIn = createAsyncThunk('auth/login', async ({email, password}: any, thunkAPI) => {  
        const response = await fetch(`/auth/login`, {
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
    const response = await fetch(`/auth/logout`, {
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
  const response = await fetch(`/auth/signup`, {
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

const resetPassword = createAsyncThunk('auth/reset-password', async ({email}: any, thunkAPI) => {  
  const response = await fetch(`/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify({
          email
      })
    });
  const data = await response.json();

  return data;
}
);

const setNewPassword = createAsyncThunk('auth/set-password', async ({email, password, code, resetActionId}: any, thunkAPI) => {  
  const response = await fetch(`/auth/set-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify({
          email,
          password,
          code,
          resetActionId
      })
    });
  const data = await response.json();

  return data;
}
);

const updateAccountData = createAsyncThunk('auth/update-account', async ({token, updatedData}: any, thunkAPI) => {  
  const response = await fetch(`/auth/update-account`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify({
          token,
          data: updatedData
      })
    });
  const data = await response.json();

  return data;
}
);

export {logIn, logOut, signUp, resetPassword, setNewPassword, updateAccountData};