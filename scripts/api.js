/**
 * API call functions
 */

/**
 * BASE URL
 */
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/mattp/bookmarks';

/**
 * Wrapper function for native `fetch` to standardize JSON parsing and error handling. 
 * @param {string} url 
 * @param {object} options 
 * @returns {Promise} - resolve on all 2xx responses with JSON body
 *                    - reject on non-2xx and non-JSON response with 
 *                      Object { code: Number, message: String }
 */

function bookmarksApiFetch(...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        error = { code: res.status };
        if (!res.headers.get('content-type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
}
/**
 * Returns api call
 */
const getBookmarks = () => {
  return bookmarksApiFetch(`${BASE_URL}`);
};

/**
 * Creates a JSON object from the name and value attributes of the passed in form element
 * @param {Element} form 
 */
const serializeJson = (form) => {
  const newBookmarkForm = new FormData(form);
  const o = {};
  // Loops through the form element 'name':'value' attributes and returns an object with key value pairs
  newBookmarkForm.forEach((val, name) => {
    return o[name] = val;
  });
  return JSON.stringify(o);
  
};

/**
 * Makes a POST call adding the boomark to the server
 * @param {Object} newBookMark 
 */
const createBookmark = (newBookMark) => {
  return bookmarksApiFetch(`${BASE_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: newBookMark
  });
};

/**
 * Makes a DELETE call using the id passed in
 * @param {string} bookmarkId 
 */
const deleteBookmark = (bookmarkId) => {
  return bookmarksApiFetch(`${BASE_URL}/${bookmarkId}`,
    {
      method: 'DELETE'
    });
};

export default {
  getBookmarks,
  createBookmark,
  serializeJson,
  deleteBookmark
};