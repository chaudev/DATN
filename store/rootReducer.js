import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './reducers';

const rootReducer = combineReducers({
  user: userSlice,
});

export default rootReducer;
