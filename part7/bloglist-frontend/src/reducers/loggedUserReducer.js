import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const loggedUserSlice = createSlice({
  name: 'loggedUser',
  initialState,
  reducers: {
    setLoggedUser(state, action) {
      return action.payload;
    },
  },
});

export default loggedUserSlice.reducer;
export const { setLoggedUser } = loggedUserSlice.actions;
