/*
* Main function to bind event listeners
* Retrieve all bookmarks
* adding bookmarks
* render page
*/

import bookmarks from './bookmarks.js';
import api from './api.js';
import store from './store.js';


const main = () => {
  api.getBookmarks()
    .then((items) => {
      items.forEach((item) => store.addBookmark(item));
      bookmarks.renderMainPage();
    });
  bookmarks.bindEventListeners();
  

};

$(main);