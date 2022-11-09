import Blog from './Blog';

const BlogList = ({ blogs, likeBlog, removeBlog, loggedUser }) => {
  return (
    <div>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLike={likeBlog}
            showRemove={loggedUser.username === blog.user.username}
            removeBlog={removeBlog}
          />
        ))}
    </div>
  );
};

export default BlogList;
