import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    portal: {
      isShown: false
    },
    snackbar: {
      isShown: false
    }
};

const miscSlice = createSlice({
  name: 'misc',
  initialState: initialState,
  reducers: {
    togglePortal: (state, action) => { 
      state.portal.isShown = !state.portal.isShown;
    }
  }
});

export default miscSlice;