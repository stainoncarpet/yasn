import { createAsyncThunk } from '@reduxjs/toolkit';

const getEvents = createAsyncThunk('user/events/fetch', async ({token, skip, limit, isUnreadOnly}: any, thunkAPI) => {  
        const response = await fetch(`http://localhost:3000/user/events`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify({
                token,
                skip,
                limit,
                isUnreadOnly
            })
          });
        const data = await response.json();

        return data;
    }
);

const markEventAsRead = createAsyncThunk('user/events/read', async ({token, eventId}: any, thunkAPI) => {  
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

export {getEvents, markEventAsRead};