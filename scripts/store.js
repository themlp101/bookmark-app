/*
* Navigation Functions for the store
*
*/

let bookmarks = [];
let adding = false;
let error = null;
let filter = 0;


// Add Bookmarks to store
const addBookmark =  (newBookmark)  => {
  bookmarks.push(newBookmark);  
};
// Find bookmark by ID
const findByID = (id) => {
  return bookmarks.find(currentBookmark => currentBookmark.id === id);
}
// updating status of bookmarks in store
const findAndUpdate = (id, newData) => {
  const currentBookmark = findByID(id);
  Object.assign(currentBookmark, newData);
}

// delete bookmarks from store
const findAndDelete =  (bookmarkId)  => {
  bookmarks = bookmarks.filter(currentBookmark => currentBookmark.id !== bookmarkId);
};

// filter out bookmarks
const setRatingForStore =  (ratingValue)  => {
  filter = ratingValue;
};

const setRatingFilter =  (rating)  => {
  setRatingForStore(rating);
  filterBookmarks();
};

const filterBookmarks =  ()=> {
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

const setError =  (err)=> {
  error = err;
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