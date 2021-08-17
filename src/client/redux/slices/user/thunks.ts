import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUnreadEvents = createAsyncThunk('user/events', async ({token, skip, limit}: any, thunkAPI) => {  
        const response = await fetch(`http://localhost:3000/user/events`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify({
                token,
                skip,
                limit
            })
          });
        const data = await response.json();

        return data;
    }
);

export const getDataByType = createAsyncThunk('user/data', async ({token, skip, limit, types}: any, thunkAPI) => {  
  const response = await fetch(`http://localhost:3000/user/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify({
          token,
          skip,
          limit,
          types
      })
    });
  const data = await response.json();

  return data;
}
);

export const markEventAsRead = createAsyncThunk('user/events/read', async ({token, eventId}: any, thunkAPI) => {  
  const response = await fetch(`http://localhost:3000/user/events/read`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify({
          token,
          eventId
      })
    });
  const data = await response.json();

  return data;
}
);

export const getFriends = createAsyncThunk('user/friends', async ({token}: any, thunkAPI) => {  
  const response = await fetch(`http://localhost:3000/user/friends`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify({
          token
      })
    });
  const data = await response.json();

  return data;
}
);