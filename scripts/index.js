import bookmarks from './bookmarks.js';
import api from './api.js';
import store from './store.js';

/**
 * Main function that calls all event listeners/handlers and makes the FETCH call from the server
 * Re-renders the page
 */
const main = () => {
  bookmarks.bindEventListeners();
  api.getBookmarks()
    .then((items) => {
      items.forEach((item) => store.addBookmark(item));
    }).then(() => bookmarks.renderMainPage());  

};

$(main);