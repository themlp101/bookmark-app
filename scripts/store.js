/**
 * Navigation Functions for the store
 */
let bookmarks = [];
let adding = false;
let error = null;
let filter = 0;


/** 
 * Push pased in object to the bookmarks array
 * @param {object} newBookmark 
 */
const addBookmark =  (newBookmark)  => {
  bookmarks.push(newBookmark);  
};
/** 
 * Find bookmark by ID match
 * @param {string} id
 */
const findByID = (id) => {
  return bookmarks.find(currentBookmark => currentBookmark.id === id);
};

/**
 * Updates object in the bookarks array by passed in id
 * @param {string} id 
 * @param {object} newData 
 */
const findAndUpdate = (id, newData) => {
  const currentBookmark = findByID(id);
  Object.assign(currentBookmark, newData);
};

/**
 * Sets the bookmarks array to a filtered list not matching the id passed in
 * @param {string} bookmarkId 
 */
const findAndDelete =  (bookmarkId)  => {
  bookmarks = bookmarks.filter(currentBookmark => currentBookmark.id !== bookmarkId);
};

/**
 * Calls function to change filter to appropraite rating value inputted by the user
 * @param {number} rating 
 */ 
const setRatingFilter =  (rating)  => {
  setRatingForStore(rating);
  filterBookmarks();
};
/**
 * Sets filter variable to rating value passed in by the select option menu
 * @param {number} ratingValue 
 */
const setRatingForStore =  (ratingValue)  => {
  filter = ratingValue;
};

/**
 * Loops through the store array and toggles hidden property depending on whether the bookmarks rating is higher or equal to the updated filter variable
 */
const filterBookmarks =  () => {
  bookmarks.forEach((bookmark) => {
    if (bookmark.rating >= filter) {
      Object.assign(bookmark, { hidden: false });
    } else {
      Object.assign(bookmark, { hidden: true });
    }
  });
};

/** 
* Sets error message in the store
* @param {Object} err
**/
const setError =  (err) => {
  error = err;
};

/**
 * Retrieves the current state of bookmarks
 */
const getBookmarks = () => {
  return bookmarks;
};

/**
 * Retrieves the error from the store
 */
const getErrorMessage = () => {
  return error;
}

export default {
  adding,
  error,
  filter,
  addBookmark,
  findByID,
  findAndUpdate,
  findAndDelete,
  setRatingFilter,
  setError,
  filterBookmarks,
  getBookmarks,
  getErrorMessage
};