/*
* Navigation Functions for the store
*
*/

const bookmarks = [];
const adding = false;
const error = null;
const filter = 0;


// Add Bookmarks to store
const addBookmark = (newBookmark) => {
  bookmarks.push(newBookmark);
};

// updating status of bookmarks in store

// delete bookmarks from store

// filter out bookmarks

export default {
  bookmarks,
  adding,
  error,
  filter,
  addBookmark
};