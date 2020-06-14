/*
* Navigation Functions for the store
*
*/

const bookmarks = [];
const adding = false;
const error = null;
let filter = 0;
// hidden = false;

// Add Bookmarks to store
const addBookmark = function (newBookmark) {
  bookmarks.push(newBookmark);  
};
// Find bookmark by ID
const findByID = (id) => {
  return bookmarks.find(currentBookmark => currentBookmark.id === id);
  // console.log(bookmarks.find(currentBookmark => currentBookmark.id === id));
};
// updating status of bookmarks in store
const findAndUpdate = (id, newData) => {
  const currentBookmark = findByID(id);
  Object.assign(currentBookmark, newData);
};

// delete bookmarks from store
const findAndDelete = function (bookmarkId)  {
  this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== bookmarkId);
  console.log(this.bookmarks)
};

// filter out bookmarks
const setRatingForStore = function (ratingValue) {
  filter = ratingValue;
  console.log(filter);
};

const setRatingFilter = function (rating) {
  setRatingForStore(rating);
  filterBookmarks();
};

const filterBookmarks = function () {
  bookmarks.forEach((bookmark) => {
    if (bookmark.rating >= filter) {
      Object.assign(bookmark, { hidden: false });
    } else {
      Object.assign(bookmark, { hidden: true });
    }
  });
};

// get value from user
// get id from array if rating is less than value
// object assign 

const setError = function (error) {
  this.error = error;
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
  setRatingFilter,
  setError,
  filterBookmarks
};