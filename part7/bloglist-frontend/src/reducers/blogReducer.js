import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    createNewBlog(state, action) {
      state.push(action.payload);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog));
    },
    removeBlog(state, action) {
      const removeId = action.payload;
      return state.filter((blog) => blog.id !== removeId);
    },
  },
});

export default blogSlice.reducer;
export const { createNewBlog, setBlogs, updateBlog, removeBlog } = blogSlice.actions;
