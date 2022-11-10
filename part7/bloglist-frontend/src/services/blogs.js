import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (input) => {
  token = `Bearer ${input}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const like = async (blog) => {
  const url = `${baseUrl}/${blog.id}`;
  const newBlog = {
    author: blog.author,
    likes: parseInt(blog.likes) + 1,
    url: blog.url,
    user: blog.user.id,
  };

  const response = await axios.put(url, newBlog);
  return response.data;
};

const remove = async (blog) => {
  const url = `${baseUrl}/${blog.id}`;

  const config = {
    headers: { authorization: token },
  };

  const response = await axios.delete(url, config);
  return response.data;
};

const addComment = async (comment, blog) => {
  const url = `${baseUrl}/${blog.id}/comments`;
  const response = await axios.post(url, comment);

  return response.data;
};

const blogService = {
  getAll,
  setToken,
  create,
  like,
  remove,
  addComment,
};

export default blogService;
