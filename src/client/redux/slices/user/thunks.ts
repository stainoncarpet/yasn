import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUnreadEvents = createAsyncThunk('user/events', async ({ token, skip, limit }: any, thunkAPI) => {
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

export const getDataByType = createAsyncThunk('user/lists', async ({ token, skip, limit, types }: any, thunkAPI) => {
  const response = await fetch(`http://localhost:3000/user/lists`, {
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

export const getFriends = createAsyncThunk('user/friends', async ({ token }: any, thunkAPI) => {
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

export const startConversation = createAsyncThunk('user/conversation/start', async ({ token, userName }: any, thunkAPI) => {
  const response = await fetch(`http://localhost:3000/user/conversation/start`, {
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
  const response = await fetch(`http://localhost:3000/user/conversation/load`, {
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
  const response = await fetch(`http://localhost:3000/user/messages/load`, {
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
  const response = await fetch(`http://localhost:3000/user/conversations/overview`, {
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

export const cancelFriendship = createAsyncThunk('user/friends/cancel', async ({fshipId, cancelerToken }: any, thunkAPI) => {
  const response = await fetch(`http://localhost:3000/user/friends/cancel`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify({
      fshipId,
      token: cancelerToken
    })
  });
  const data = await response.json();

  return data;
}
);

export const sendFriendRequest = createAsyncThunk('user/friends/request', async ({userName, senderToken }: any, thunkAPI) => {
  const response = await fetch(`http://localhost:3000/user/friends/request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify({
      userName, 
      token: senderToken
    })
  });
  const data = await response.json();

  return data;
}
);

export const acceptFriendRequest = createAsyncThunk('user/friends/accept', async ({accepterToken, fshipId}: any, thunkAPI) => {
  const response = await fetch(`http://localhost:3000/user/friends/accept`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify({
      token: accepterToken, fshipId
    })
  });
  const data = await response.json();

  return data;
}
);

export const rejectFriendRequest = createAsyncThunk('user/friends/reject', async ({rejecterToken, fshipId}: any, thunkAPI) => {
  const response = await fetch(`http://localhost:3000/user/friends/reject`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify({
      token: rejecterToken, fshipId
    })
  });
  const data = await response.json();

  return data;
}
);

export const withdrawFriendRequest = createAsyncThunk('user/friends/withdraw', async ({withdrawerToken, fshipId}: any, thunkAPI) => {
  const response = await fetch(`http://localhost:3000/user/friends/withdraw`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    body: JSON.stringify({
      token: withdrawerToken, fshipId
    })
  });
  const data = await response.json();

  return data;
}
);