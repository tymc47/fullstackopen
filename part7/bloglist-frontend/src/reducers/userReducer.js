import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUsers } = userSlice.actions;
