import { debounce } from 'lodash';
import { fetchPosts } from './js/services/apiService';

const refs = {
  input: document.querySelector('input#filter-box'),
  postList: document.querySelector('.post-list'),
};

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(handleFilterPostsInput, DEBOUNCE_DELAY));

function clearMarkup() {
  refs.postList.innerHTML = '';
}

function handleFilterPostsInput(e) {
  const query = e.target.value.trim();
  if (!query) {
    clearMarkup(); 
    return;
  }
  fetchPosts()
    .then(data => {
      clearMarkup();
      renderList(data);
    })
    .catch(console.log);
}

function createPostItemMarkup({ id, title, body }) {
  return `<article class="post-item">
      <span class="post-id">${id}</span>
      <h3 class="post-title">${title}</h3>
      <p class="post-body">${body}</p>
    </article>`;
}


function renderList(data) {
  console.log('data:', data);
  const markup = data
    .map(({ id, title, body }) => {
      return createPostItemMarkup({ id, title, body });
    })
    .join('');
  refs.postList.insertAdjacentHTML('afterbegin', markup);
}
