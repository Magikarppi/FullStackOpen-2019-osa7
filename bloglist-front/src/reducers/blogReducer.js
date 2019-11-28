const blogReducer = (state = [], action) => {
  console.log('blogReducer runs with action:', action);
  switch (action.type) {
  case 'INITIALIZE_BLOGS':
    console.log('case INITIALIZE_BLOGS runs with action.data.blogs:', action.data.blogs);
    return action.data.blogs;
  case 'ADD_BLOG':
    console.log('action.data.blog', action.data.blog);
    return [...state, action.data.blog];
  case 'UPDATE_BLOG': {
    console.log('action.data.blog', action.data.blog);
    console.log('state::', state)
    const updateBlog = action.data.blog
    const filteredBlogs = state.filter((blog) => blog.id !== updateBlog.id);
    return [...filteredBlogs, updateBlog]
  }
  case 'DELETE_BLOG': {
    console.log('action.data.blog', action.data.blog);
    console.log('state::', state)
    const deleteBlog = action.data.blog
    const filteredBlogs = state.filter(blog => blog.id !== deleteBlog.id);
    return [...filteredBlogs]
  }
  case 'COMMENT_BLOG': {
    console.log('action.data.blog', action.data.blog);
    console.log('state in blogReducer before update::', state)
    const commentBlog = action.data.blog
    const filteredBlogs = state.filter(blog => blog.id !== commentBlog.id);
    // const blogsCopy = [...state]
    // const blogToComment = blogsCopy.find(blog => blog.id === commentBlog.id);
    // blogToComment.comments.push(comment)
    return [...filteredBlogs, commentBlog]
  }
  default:
    console.log('default returns')
    return state;
  }
};

export const initializeBlogs = (blogs) => {
  console.log('initializeBlogs runs with blogs', blogs)
  return {
    type: 'INITIALIZE_BLOGS',
    data: { blogs }
  }
}

export const addBlog = (blog) => {
  console.log('addBlog runs')
  return {
    type: 'ADD_BLOG',
    data: { blog }
  }
}

export const updateBlog = (blog) => {
  return {
    type: 'UPDATE_BLOG',
    data: { blog }
  }
}

export const deleteBlog = (blog) => {
  return {
    type: 'DELETE_BLOG',
    data: { blog }
  }
}

export const commentBlog = (blog) => {
  return {
    type: 'COMMENT_BLOG',
    data: { blog }
  }
}


export default blogReducer