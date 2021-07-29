import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isShown: false
};

const portalSlice = createSlice({
  name: 'portal',
  initialState: initialState,
  reducers: {
    togglePortal: (state, action) => { 
      state.isShown = !state.isShown;
    }
  }
});

export default portalSlice;