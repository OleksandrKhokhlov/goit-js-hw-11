'use strict';

import { JSONPlaceholderApi } from './search-api';

import { inputEl } from './index';

const jsonPlaceholderApi = new JSONPlaceholderApi();

async function getGalleryImgs() {
  const searchQuery = await inputEl.value.trim();

  if (!searchQuery) {
    return;
  }

  jsonPlaceholderApi.query = searchQuery;

  const response = await jsonPlaceholderApi.loadImg();

  jsonPlaceholderApi.totalHits = response.data.totalHits;

  return response;
}

export { jsonPlaceholderApi, getGalleryImgs };
