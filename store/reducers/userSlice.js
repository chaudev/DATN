import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';

const forgotPass = createAsyncThunk('user/forgotPass', async payload => {
  // call forgotPass API

  return {};
});
const fetchUser = createAsyncThunk('user/fetchUser', async payload => {
  // call login API

  // save user data to AsyncStorage

  return {};
});
const fetchLocalUser = createAsyncThunk(
  'user/fetchLocalUser',
  async payload => {
    const value = await AsyncStorage.getItem('currentUser');
    return JSON.parse(value);
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isActivated: false,
    current: {},
    settings: {},
  },
  reducers: {
    activate: (state, action) => {
      console.log('activate: ', action);
      state.isActivated = action.payload;
    },
  },
  extraReducers: {
    [fetchLocalUser.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {activate} = userSlice.actions;

export default userSlice.reducer;
