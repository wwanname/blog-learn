export function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    timeZone: "UTC",
  })
}

export function formatBlogPosts(posts, {
  filterOutFuturePosts = true,
  sortByDate = true,
  limit = undefined,
} = {}) {

  const filteredPosts = posts.reduce((acc, post) => {
    const { createdAt } = post.frontmatter;
    // filterOutFuturePosts if true
    if (filterOutFuturePosts && new Date(createdAt) > new Date()) return acc;

    // add post to acc
    acc.push(post)
    return acc;
  }, [])

  // sortByDate or randomize
  if (sortByDate) {
    filteredPosts.sort((a, b) => new Date(b.frontmatter.createdAt) - new Date(a.frontmatter.createdAt))
  } else {
    filteredPosts.sort(() => Math.random() - 0.5)
  }

  // limit if number is passed
  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  }
  return filteredPosts;
}

export const extractFrontmatter = (markdown) => {
    const regex = /^---\n([\s\S]+?)\n---/;
    const match = markdown.match(regex);

    if (match) {
      // Chuyển frontmatter (YAML) thành đối tượng JavaScript
      const frontmatterString = match[1];
      const frontmatter = {};

      // Chuyển các dòng trong frontmatter thành các cặp key-value
      frontmatterString.split('\n').forEach((line) => {
        const [key, ...value] = line.split(':');
        if (key && value) {
          frontmatter[key.trim()] = value.join(':').trim();
        }
      });

      return frontmatter;
    }

    return null;
  };