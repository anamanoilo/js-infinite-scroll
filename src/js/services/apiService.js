async function fetchPosts({ page, query }) {
  const params = new URLSearchParams({
    _limit: '10',
    _page: page || '1',
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