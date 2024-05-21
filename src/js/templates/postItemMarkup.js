function createPostItemMarkup({ id, title, body }) {
  return `<article class="post-item">
            <span class="post-id">${id}</span>
            <h3>${title}</h3>
            <p>${body}</p>
          </article>`;
}

export { createPostItemMarkup };