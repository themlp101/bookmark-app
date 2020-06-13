/*
* Navigation Functions for the store
*
*/

const bookmarks = [];
const adding = false;
const error = null;
const filter = 0;


// Add Bookmarks to store
const addBookmark = function (newBookmark) {
  this.bookmarks.push(newBookmark);
};
// Find bookmark by ID
const findByID = (id) => {
  return bookmarks.find(currentBookmark => currentBookmark.id === id);
};
// updating status of bookmarks in store
const findAndUpdate = (id, newData) => {
  const currentBookmark = findByID(id);
  Object.assign(currentBookmark, newData);
};
// delete bookmarks from store
const findAndDelete = function (bookmarkId)  {
  this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== bookmarkId);
};

// filter out bookmarks
const setRatingForStore = function (ratingValue) {
  this.filter = ratingValue;
};

const setRatingFilter = function (rating) {
  setRatingForStore(rating);
  this.bookmarks = filterBookmarks();
};

const filterBookmarks = function () {
  this.bookmarkes = this.bookmarks.filter(bookmark => bookmark.rating >= this.filter);
};

export default {
  bookmarks,
  adding,
  error,
  filter,
  addBookmark,
  findByID,
  findAndUpdate,
  findAndDelete,
  setRatingFilter
};