/*
* Navigation Functions for the store
*
*/

const bookmarks = [];
const adding = false;
const error = null;
let filter = 0;


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
  console.log('hello')
  filter = ratingValue;
};

const setRatingFilter = function (rating) {
  setRatingForStore(rating);
  this.bookmarks = filterBookmarks();
};

const filterBookmarks = function () {
  return bookmarks.filter(bookmark => bookmark.rating >= filter);
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