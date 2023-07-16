'use strict';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '38177743-3b0ef348d0ddbcece13b89b90';
const axios = require('axios').default;

export class JSONPlaceholderApi {
  query = null;
  page = 1;
  perPage = 40;
  totalHits = 0;

  async loadImg(query) {
    return await axios.get(BASE_URL, {
      params: {
        key: KEY,
        q: this.query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: this.page,
        per_page: this.perPage,
      },
    });
  }
}
