import { createSlice } from '@reduxjs/toolkit';

import { IMiscSlice, ESnackbarType } from '../../../interfaces/state/i-misc-slice';

import reducers from './reducers';
import extraReducers from './extra-reducers';

const initialState: IMiscSlice = {
  portal: {
    isShown: false
  },
  snackbar: {
    isShown: false,
    content: "",
    type: ESnackbarType.NORMAL
  }
};

const miscSlice = createSlice({
  name: 'misc',
  initialState: initialState,
  reducers: reducers,
  extraReducers: extraReducers
});

export default miscSlice;

export {initialState};