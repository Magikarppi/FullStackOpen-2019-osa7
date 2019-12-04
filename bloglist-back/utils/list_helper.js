const dummy = (blogs) => {
    return 1
  }
  
  
const totalLikes = (blogs) => {
      const totalLikes = blogs.reduce((sum, item) => {
          return sum + item.likes
      }, 0)

      return blogs.length === 0
        ? 0
        : totalLikes
}

const favoriteBlog = (blogs) => {
    const reducer = (sum, item) => {
        if (item.likes > sum.likes) {
            return item
        }
        return sum
    }

    return blogs.reduce(reducer, { likes: 0 })
}

const mostBlogs = (blogs) => {

  const authorsObj = blogs.reduce(function(obj, item) {
    obj[item.author] = ++obj[item.author] || 1;
    return obj;
  }, {});

  const arr = Object.values(authorsObj)
  const maxVal = Math.max(...arr)

  const authorMostName = Object.keys(authorsObj).reduce((a, b) => authorsObj[a] > authorsObj[b] ? a : b);

  console.log('authorMostNmae:', authorMostName)

  const authorWithMostBlogs = {
    author: authorMostName,
    blogs: maxVal
  }

  return authorWithMostBlogs
}

const mostLikes = (blogs) => {

  const result = blogs.reduce(function (obj, item) {
      obj[item.author] = obj[item.author] || [];
      obj[item.author] = Number((obj[item.author] + item.likes));
      return obj;
  }, Object.create(null));

  const authorMost = Object.keys(result).reduce((a, b) => result[a] > result[b] ? a : b);

  const likes = Object.values(result)
  const highest = Math.max(...likes)
  console.log('likes', likes)
console.log('result',result);
console.log('result[0]', result[0])

  const winner = {
    author: authorMost,
    likes: highest
  }

  return winner

  // const arr = Object.values(authorsObj)
  // const maxVal = Math.max(...arr)

  // const authorMostName = Object.keys(authorsObj).reduce((a, b) => authorsObj[a] > authorsObj[b] ? a : b);

  // console.log('authorMostNmae:', authorMostName)

  // const authorWithMostBlogs = {
  //   author: authorMostName,
  //   blogs: maxVal
  // }

  // return authorWithMostBlogs
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}