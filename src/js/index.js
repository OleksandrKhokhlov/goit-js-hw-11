// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
import { getGalleryImgs } from './get-imgs';
import { markupCardPoto } from './card-photo';
import { jsonPlaceholderApi } from './get-imgs';
import { smoothScroll } from './smooth-scroll';
import { loadMoreBtn } from './load-more-btn';
import Notiflix from 'notiflix';

const formRef = document.querySelector('#search-form');
const inputEl = formRef.firstElementChild;
const loadMoreBtnRef = document.querySelector('.load-more');
const galleryConteinerRef = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a');

formRef.addEventListener('submit', onFormSubmit);

async function onFormSubmit(evt) {
  evt.preventDefault();
  
  loadMoreBtnRef.classList.add('visually-hidden');
  
  jsonPlaceholderApi.page = 1;
  
  Notiflix.Loading.dots();
  
  const galleryImgs = await getGalleryImgs();
  
  try {
    if (galleryImgs.data.hits.length === 0) {
      throw new Error();
    }
    Notiflix.Notify.success(
      `Hooray! We found ${galleryImgs.data.totalHits} images.`
      );
      
      const markupCardsPhotos = await markupCardPoto(galleryImgs.data.hits);
      
      galleryConteinerRef.innerHTML = await markupCardsPhotos;
      
      observer.observe(targetEl);
      
      Notiflix.Loading.remove();
      
      smoothScroll();
      
      lightbox.refresh();
      
      if (jsonPlaceholderApi.totalHits < jsonPlaceholderApi.perPage) {
        loadMoreBtnRef.classList.add('visually-hidden');
        Notiflix.Report.info(
          `We're sorry`,
          `but you've reached the end of search results.`,
          'Okay'
          );
          return;
        }
        
        loadMoreBtnRef.classList.remove('visually-hidden');
      } catch (error) {
        Notiflix.Report.info(
          'Sorry,',
          'there are no images matching your search query.<br/><br/> Please try again.',
          'Okay'
          );
          Notiflix.Loading.remove();
          galleryConteinerRef.innerHTML = '';
        }
      }
      
      // LOADMORE    BTN
      // loadMoreBtnRef.addEventListener('click', onLoadMoreClick);
      
      // async function onLoadMoreClick() {
//   jsonPlaceholderApi.page += 1;

//   Notiflix.Loading.dots();

//   await loadMoreBtn();

//   Notiflix.Loading.remove();

//   smoothScroll();

//   lightbox.refresh();
// }

// INFINITY   SCROLL

const targetEl = document.querySelector('.js-guard');
let options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(infinityScroll, options);

function infinityScroll(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      jsonPlaceholderApi.page += 1;
      Notiflix.Loading.dots();

      loadMoreBtn();

      Notiflix.Loading.remove();

      smoothScroll();

      lightbox.refresh();
    }
  });
}

export { inputEl, galleryConteinerRef, loadMoreBtnRef };
