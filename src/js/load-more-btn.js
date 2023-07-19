'use strict';

import { getGalleryImgs } from './get-imgs';
import { jsonPlaceholderApi } from './get-imgs';
import { galleryConteinerRef } from './index';
import { loadMoreBtnRef } from './index';
import { markupCardPoto } from './card-photo';
import { Report } from 'notiflix/build/notiflix-report-aio';

export async function loadMoreBtn() {
  const totalPages = Math.ceil(
    jsonPlaceholderApi.totalHits / jsonPlaceholderApi.perPage
  );
  if (totalPages >= jsonPlaceholderApi.page) {
    const galleryImgs = await getGalleryImgs();

    const markupCardsPhotos = markupCardPoto(galleryImgs.data.hits);

    galleryConteinerRef.insertAdjacentHTML('beforeend', markupCardsPhotos);
    return;
  }

  loadMoreBtnRef.classList.add('visually-hidden');
  Report.info(
    `We're sorry`,
    `but you've reached the end of search results.`,
    'Okay'
  );
}
