import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './todoSlice';

const store = configureStore({
  reducer: {
 todo:todoSlice,   // Add your reducers here
  },
});

export default store;