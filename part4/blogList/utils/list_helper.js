const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length ===0
    ? 0
    : blogs.reduce(
      (sum, currentValue) => sum += currentValue.likes,
      0
    )
}


const favoriteBlog = (blogs) => {
  const res = _.maxBy(blogs, 'likes')

  if (res === undefined) return undefined
  const { title, author, likes } = res
  return { title, author, likes }
}



const mostBlogs = (givenBlogs) => {
  const frequency = _.countBy(givenBlogs, 'author')

  const authorBlogsArray = _.map(frequency, (value, key) => ({
    author: key,
    blogs: value
  }))

  const res = _.maxBy(authorBlogsArray, 'blogs')

  return res
}


const mostLikes = (blogs) => {
  if (blogs.length ===0 ) return undefined


  const result = _(blogs)
    .groupBy('author')
    .map((ownBlogs, author) => ({
      author: author,
      likes: _.sumBy(ownBlogs, 'likes')
    }))
    .value()


  const authorWithMostLikes = _.maxBy(result, 'likes')

  return authorWithMostLikes

}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}