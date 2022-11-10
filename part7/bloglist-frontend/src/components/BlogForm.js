import { TextField, Button, Container } from '@mui/material';
import { useState } from 'react';

const BlogForm = ({ handleNewBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    handleNewBlog(newBlog);
    setNewBlog({
      title: '',
      author: '',
      url: '',
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Container>
          <h3>Create New Blog</h3>
          <TextField
            variant="outlined"
            label="Blog Title"
            size="small"
            value={newBlog.title}
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
          />
          <TextField
            variant="outlined"
            label="Blog Author"
            size="small"
            value={newBlog.author}
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
          />
          <TextField
            variant="outlined"
            label="Blog URL"
            size="small"
            value={newBlog.url}
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
          />
          <Button id="createblog-btn" type="submit">
            create
          </Button>
        </Container>
      </form>
    </div>
  );
};

export default BlogForm;
