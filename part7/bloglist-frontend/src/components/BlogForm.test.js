import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from  '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test.only('BlogForm update state correctly and calls onSubmit', async () => {
  const mockCreate = jest.fn();
  const mockInput = {
    title: 'testing blog form',
    author: 'tester1',
    url: 'url.com/test'
  };
  const user = userEvent.setup();

  render(<BlogForm handleNewBlog={ mockCreate } />);

  const titleInput = screen.getByPlaceholderText('Blog Title');
  const authorInput = screen.getByPlaceholderText('Blog Author');
  const urlInput = screen.getByPlaceholderText('Blog URL');
  const createBtn = screen.getByText('create');

  await user.type(titleInput, mockInput.title);
  await user.type(authorInput, mockInput.author);
  await user.type(urlInput, mockInput.url);
  await user.click(createBtn);

  expect(mockCreate.mock.calls).toHaveLength(1);
  expect(mockCreate.mock.calls[0][0]).toEqual(mockInput);
});