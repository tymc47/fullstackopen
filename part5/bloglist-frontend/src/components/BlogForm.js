import { useState } from 'react';

const BlogForm = ({ handleNewBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNewBlog(newBlog);
    setNewBlog({
      title: '',
      author: '',
      url: ''
    });
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
            title:
          <input
            type='text'
            placeholder='Blog Title'
            value={newBlog.title}
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            placeholder='Blog Author'
            value={newBlog.author}
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}/>
        </div>
        <div>
          url:
          <input
            type='text'
            placeholder='Blog URL'
            value={newBlog.url}
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}/>
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default BlogForm;