import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import NavBar from './components/NavBar';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import Users from './components/Users';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';

import blogService from './services/blogs';

import { setNotification } from './reducers/notificationReducer';
import { createNewBlog, setBlogs, updateBlog, removeBlog } from './reducers/blogReducer';
import { setLoggedUser } from './reducers/loggedUserReducer';
import { Route, Routes, useMatch, useNavigate } from 'react-router-dom';
import User from './components/User';
import Blog from './components/Blog';

import { Container } from '@mui/material';

const App = () => {
  const blogFormRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { blogs, notification, loggedUser } = useSelector((state) => state);

  console.log('in app', blogs, loggedUser);

  const matchUser = useMatch('/users/:id');
  const user = matchUser === null ? null : matchUser.params.id;
  const matchBlog = useMatch('/blogs/:id');
  const blog = matchBlog === null ? null : matchBlog.params.id;

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(setLoggedUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    dispatch(setLoggedUser(null));
    blogService.setToken(null);
  };

  const addNewBlog = async (newBlog) => {
    console.log('in add blog', newBlog);
    console.log('in add blog', loggedUser);
    const result = await blogService.create(newBlog);
    result.user = loggedUser;
    dispatch(createNewBlog(result));
    blogFormRef.current.toggleVisibility();

    dispatch(
      setNotification({
        type: 'success',
        content: `a new blog ${result.title} by ${result.author} added`,
      })
    );

    setTimeout(() => {
      dispatch(setNotification(null));
    }, 3000);
  };

  const handleLike = async (blogToUpdate) => {
    console.log('handleLike', blogToUpdate);
    const result = await blogService.like(blogToUpdate);
    result.user = loggedUser;

    dispatch(updateBlog(result));
  };

  const handleRemove = async (blogToRemove) => {
    if (!window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)) return;

    console.log('remove blog', blogToRemove);
    await blogService.remove(blogToRemove);
    dispatch(removeBlog(blogToRemove.id));
    navigate('/');
  };

  if (loggedUser === null) {
    return (
      <Container>
        <h2>Log in to application</h2>
        <Notification msgObj={notification} />
        <LoginForm />
      </Container>
    );
  }

  return (
    <Container>
      <NavBar user={loggedUser} logoutBtn={handleLogout} />
      <h2>Blog App</h2>
      <Notification msgObj={notification} />

      <Routes>
        <Route path="/users/:id" element={<User userId={user} />} />
        <Route
          path="/blogs/:id"
          element={<Blog blogId={blog} likeBlog={handleLike} removeBlog={handleRemove} loggedUser={loggedUser} />}
        />
        <Route
          path="/"
          element={
            <div>
              <Togglable showLabel="new blog" hideLabel="cancel" ref={blogFormRef}>
                <BlogForm handleNewBlog={addNewBlog} />
              </Togglable>
              <BlogList blogs={blogs} />
            </div>
          }
        />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Container>
  );
};

export default App;
