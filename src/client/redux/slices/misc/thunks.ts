import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUnreadEvents = createAsyncThunk('user/events', async ({ token, skip, limit }: any, thunkAPI) => {
  const response = await fetch(`/user/events`, {
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

export const getDataByType = createAsyncThunk('user/lists', async ({ token, skip, limit, types }: any, thunkAPI) => {
  const response = await fetch(`/user/lists`, {
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

export const markEventAsRead = createAsyncThunk('user/events/read', async ({ token, eventId }: any, thunkAPI) => {
  const response = await fetch(`/user/events/read`, {
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

export const getFriends = createAsyncThunk('user/friends', async ({ token }: any, thunkAPI) => {
  const response = await fetch(`/user/friends`, {
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

export const startConversation = createAsyncThunk('user/conversation/start', async ({ token, userName }: any, thunkAPI) => {
  const response = await fetch(`/user/conversation/start`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify({
      token,
      userName
    })
  });
  const data = await response.json();

  return data;
}
);

export const loadConversation = createAsyncThunk('user/conversation/load', async ({ token, conversationId }: any, thunkAPI) => {
  const response = await fetch(`/user/conversation/load`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify({
      token,
      conversationId
    })
  });
  const data = await response.json();

  return data;
}
);

export const loadMoreMessages = createAsyncThunk('user/messages/load', async ({ token, conversationId, alreadyLoadedNumber }: any, thunkAPI) => {
  const response = await fetch(`/user/messages/load`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify({
      token,
      conversationId,
      alreadyLoadedNumber
    })
  });
  const data = await response.json();

  return data;
}
);

export const getConversationsOverview = createAsyncThunk('user/conversations/overview', async ({ token }: any, thunkAPI) => {
  const response = await fetch(`/user/conversations/overview`, {
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