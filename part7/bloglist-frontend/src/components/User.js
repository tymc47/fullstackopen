import { useSelector } from 'react-redux';

const User = ({ userId }) => {
  console.log('in User comp.', userId);

  const user = useSelector((state) => {
    console.log(state.users);
    return state.users.find((user) => user.id === userId);
  });

  console.log('in user comp', user);
  if (!user) return null;

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
