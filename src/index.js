import debounce from 'lodash.debounce';
import { fetchPosts } from './js/services/apiService';
import { createPostItemMarkup } from './js/templates/postItemMarkup';

const refs = {
  input: document.querySelector('input#filter-box'),
  postList: document.querySelector('.post-list'),
};

const DEBOUNCE_DELAY = 300;
let page = 1;
let query = null;

const lastPostObserver = new IntersectionObserver(
  ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      page += 1;
      loadPage({ page, query });
    }
  },
  {
    threshold: 1,
  },
);

refs.input.addEventListener('input', debounce(handleFilterPostsInput, DEBOUNCE_DELAY));

function handleFilterPostsInput(e) {
  query = e.target.value.trim();
  page = 1;
  refs.postList.innerHTML = '';
  loadPage({ page, query });
}


function renderList(data) {
  const markup = data
    .map(({ id, title, body }) => {
      return createPostItemMarkup({ id, title, body });
    })
    .join('');
  refs.postList.insertAdjacentHTML('beforeend', markup);
}

function loadPage({ page, query }) {
  fetchPosts({ page, query })
    .then(data => {
      if (data.length) {
        renderList(data);
        const lastPost = document.querySelector('.post-item:last-child');
        if (lastPost) {
          lastPostObserver.observe(lastPost);
        }
      }
    })
    .catch(console.log);
}

loadPage({ page });
