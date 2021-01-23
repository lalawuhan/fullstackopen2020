const totalLikes = (blogs) => {
  const reducer = (sum = 0, item) => {
    return sum + item.likes
  }
  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0) / blogs.length
}

const favoriteBlog = (blogs) => {
  let maxNumLikes = -1
  let maxBlog
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > maxNumLikes) {
      maxNumLikes = blogs[i].likes
      maxBlog = blogs[i]
    }
  }
  return (({ title, author, likes }) => ({ title, author, likes }))(maxBlog)
}



module.exports = {
  totalLikes,
  favoriteBlog
}