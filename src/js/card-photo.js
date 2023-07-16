export function markupCardPoto(galleryImgs) {
  return galleryImgs
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
  <a href="${largeImageURL}" class="link">
   <div class="photo-card">
   <img src="${webformatURL}" alt="${tags}" width="360"	height="300" loading="lazy" />   
   <div class="info">
   <p class="info-item">
   <b>Likes</b>
   <span>${likes}</span>
   </p>
   <p class="info-item">
   <b>Views</b>
   <span>${views}</span>
   </p>
   <p class="info-item">
   <b>Comments</b>
   <span>${comments}</span>
   </p>
   <p class="info-item">
   <b>Downloads</b>
   <span>${downloads}</span>
   </p>
   </div>
   </div>
   </a>
   `;
      }
    )
    .join('');
}
