const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
  if(!blogs || blogs.length === 0) return 0

  return blogs.reduce((sumOfLikes, blog) => {
    return sumOfLikes += blog.likes
  }, 0)
}

const favouriteBlog = (blogs) => {
  if(!blogs || blogs.length === 0) return null

  return blogs.reduce((fav, blog) => {
    console.log(fav)
    if(blog.likes > fav.likes) return blog
    else return fav
  }, blogs[0])
}

const mostBlogs = (blogs) => {
  if(!blogs || blogs.length === 0) return null

  const author = _.maxBy(_.toPairs(_.countBy(blogs, (blog) => blog.author)), _.last)
  const result = {
    author: author[0],
    blogs: author[1]
  }
  return result
}

const mostLikes = (blogs) => {
  if(!blogs || blogs.length === 0) return null

  const authors =
    _(blogs)
    .groupBy('author')
    .map((obj, key) => ({
        'author': key,
        'likes': _.sumBy(obj, 'likes')
      }))
    .value();

  return authors.reduce((mostlikes, author) => {
    if (author.likes > mostlikes.likes) return author
    else return mostlikes
  }, authors[0])
}
  
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}