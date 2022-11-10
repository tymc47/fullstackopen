import { TableBody, TableContainer, Table, TableRow, TableCell } from '@mui/material';
import { Link } from 'react-router-dom';

const BlogList = ({ blogs }) => {
  const blogListStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <TableRow key={blog.id} style={blogListStyle}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title} {blog.author}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BlogList;
