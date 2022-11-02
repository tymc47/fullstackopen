const blogsRouter = require('express').Router()
const Blog = require('../model/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
      
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (!blog.title || !blog.url) return response.status(400).end()

    if (!blog.likes) blog.likes = 0
  
    const results = await blog.save()
    
    response.status(201).json(results)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end();
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const id = request.params.id

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const result = await Blog.findByIdAndUpdate(id, blog, { new: true, context: "query"})

  response.json(result);
})

module.exports = blogsRouter;
