import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from  '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

const mockBlog = {
  title: 'this is a mock blog',
  author: 'Tester',
  likes: 2,
  url: 'testing.com/test',
  user: { name: 'tester' }
};


describe('testing blog content', () => {
  let container;

  beforeEach(() => {
    container = render(<Blog blog={mockBlog}/>).container;
  });

  test('renders only title and author', () => {
    const blogHeader = screen.getByText(`${mockBlog.title} ${mockBlog.author}`);
    expect(blogHeader).toBeDefined();

    const blogDetails = container.querySelector('.blog-details');
    expect(blogDetails).toHaveStyle('display: none');
  });

  test('show likes and url after clicking show', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show');

    const blogDetails = container.querySelector('.blog-details');
    expect(blogDetails).toHaveStyle('display: none');

    await user.click(button);

    expect(blogDetails).not.toHaveStyle('display: none');

  });
});

test('like handler is called correctly', async () => {
  const mockLike = jest.fn();
  render(<Blog blog={mockBlog} updateLike={mockLike}/>);

  const user = userEvent.setup();
  const button = screen.getByText('like');
  await user.click(button);
  await user.click(button);

  expect(mockLike.mock.calls).toHaveLength(2);
});

