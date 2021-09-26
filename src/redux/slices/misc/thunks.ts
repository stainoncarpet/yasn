import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUnreadEvents = createAsyncThunk('user/events', async ({ skip, limit }: any, thunkAPI) => {
  const response = await fetch(`/user/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify({
      skip,
      limit
    })
  });
  const data = await response.json();

  return data;
}
);

export const getDataByType = createAsyncThunk('user/lists', async ({ skip, limit, types }: any, thunkAPI) => {
  const response = await fetch(`/user/lists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify({
      skip,
      limit,
      types
    })
  });
  const data = await response.json();

  return data;
}
);

export const markEventAsRead = createAsyncThunk('user/events/read', async ({ eventId }: any, thunkAPI) => {
  const response = await fetch(`/user/events/read`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify({
      eventId
    })
  });
  const data = await response.json();

  return data;
}
);

export const getFriends = createAsyncThunk('user/friends', async () => {
  const response = await fetch(`/user/friends`);
  const data = await response.json();

  return data;
}
);

export const startConversation = createAsyncThunk('user/conversation/start', async ({ userName }: any, thunkAPI) => {
  const response = await fetch(`/user/conversation/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify({
      userName
    })
  });
  const data = await response.json();

  return data;
}
);

export const loadConversation = createAsyncThunk('user/conversation/load', async ({ conversationId }: any, thunkAPI) => {
  const response = await fetch(`/user/conversation/load`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify({
      conversationId
    })
  });
  const data = await response.json();

  return data;
}
);

export const loadMoreMessages = createAsyncThunk('user/messages/load', async ({ conversationId, alreadyLoadedNumber }: any, thunkAPI) => {
  const response = await fetch(`/user/messages/load`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify({
      conversationId,
      alreadyLoadedNumber
    })
  });
  const data = await response.json();

  return data;
}
);

export const getConversationsOverview = createAsyncThunk('user/conversations/overview', async () => {
  const response = await fetch(`/user/conversations/overview`);
  const data = await response.json();

  return data;
}
);