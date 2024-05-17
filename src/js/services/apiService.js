async function fetchPosts(limit, page, query) {
  const params = new URLSearchParams({
    _page: page?.toString(),
    _limit: limit?.toString(),
  });
  if (query) {
    params.append('q', query);
  }
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?${params}`);
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
}


export {fetchPosts}