import { useDispatch, useSelector } from 'react-redux';
import blogService from '../services/blogs';
import { updateBlog } from '../reducers/blogReducer';

const Blog = ({ blogId, likeBlog, removeBlog, loggedUser }) => {
  const dispatch = useDispatch();
  const blog = useSelector((state) => {
    return state.blogs.find((blog) => blog.id === blogId);
  });

  if (!blog) return null;

  const handleAddComment = (event) => {
    event.preventDefault();
    const newCm = { content: event.target.input.value };
    blogService.addComment(newCm, blog).then((data) => {
      delete data.blog;
      const newBlog = {
        ...blog,
        comments: blog.comments.concat([data]),
      };
      dispatch(updateBlog(newBlog));
    });

    event.target.input.value = '';
  };

  console.log('in blog', blog);
  console.log('in blog', loggedUser);
  const removeBtnStyle = {
    display: loggedUser.username === blog.user.username ? '' : 'none',
  };

  return (
    <div className="blog-container">
      <h2>
        {blog.title} {blog.author}
      </h2>

      <div className="blog-details">
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          likes {blog.likes}
          <button onClick={() => likeBlog(blog)}>like</button>
        </div>
        <div>added by{blog.user.name}</div>
        <button style={removeBtnStyle} onClick={() => removeBlog(blog)}>
          remove
        </button>
      </div>
      <div className="blog-comments">
        <h3>comments</h3>
        <form onSubmit={handleAddComment}>
          <input name="input" placeholder="add your comment"></input>
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map((cm) => (
            <li key={cm.id}>{cm.content}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
