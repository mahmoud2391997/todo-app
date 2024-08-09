import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
  },
  reducers: {
    // Add your reducers here
  },
});

// Export the action creators
export const { } = todoSlice.actions;

export default todoSlice.reducer;