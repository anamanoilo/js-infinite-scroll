import debounce from 'lodash.debounce';
import { fetchPosts } from './js/services/apiService';
import { createPostItemMarkup } from './js/templates/postItemMarkup';

const refs = {
  input: document.querySelector('input#filter-box'),
  postList: document.querySelector('.post-list'),
  loader: document.querySelector('.loader'),
};

const DEBOUNCE_DELAY = 300;
let page = 1;
let query = null;

refs.input.addEventListener('input', debounce(handleFilterPostsInput, DEBOUNCE_DELAY));

loadPage({ page });

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

function loadPage({ page, query }) {
  showLoader();
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
    .catch(console.log)
    .finally(hideLoader);
}

function handleFilterPostsInput(e) {
  const newQuery = e.target.value.trim();
  if (query === newQuery) {
   return;
  } 
  query = newQuery;
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

function hideLoader() {
  refs.loader.classList.add('is-hidden');
}
function showLoader() {
  refs.loader.classList.remove('is-hidden');
}


