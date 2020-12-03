import React from 'react'

const Blog = ({ blog }) => (
  <div className="blog-post">
    <p>{blog.title}</p>
    <p>{blog.author}</p>
  </div>
)

export default Blog
