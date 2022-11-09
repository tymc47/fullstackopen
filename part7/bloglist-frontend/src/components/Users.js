import userService from '../services/users';
import { setUsers } from '../reducers/userReducer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import User from './User';

const Users = ({ user }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    userService.getAll().then((users) => {
      dispatch(setUsers(users));
    });
  }, []);

  if (user) {
    const target = users.find((x) => x.id === user.id);
    return <User user={target} />;
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
