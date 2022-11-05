const blogsRouter = require('express').Router()
const Blog = require('../model/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({}).populate('user', { username: 1, name: 1})
      
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body

    console.log(body)
    const user = request.user
    console.log(user)

    if(!user) return response.status(401).json({ error: "Unauthorized"})

    if (!body.title || !body.url) return response.status(400).end()

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })
  
    const results = await blog.save()

    user.blogs = user.blogs.concat(results._id)
    await user.save()
    
    response.status(201).json(results)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)

  const user = request.user

  if (blogToDelete.user.toString() !== user._id.toString()){
    return response.status(401).json({ error: 'token invalid'})
  }
  
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
    likes: body.likes,
    user: body.user
  }

  const result = await Blog.findByIdAndUpdate(id, blog, { new: true, context: "query"})

  response.json(result);
})

module.exports = blogsRouter;
