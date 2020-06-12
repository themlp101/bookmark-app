/*
* Render Functions to display information to the DOM
*
*/


import store from './store.js';
import api from './api.js';

// template functions
const mainPage = () => {
  return $('main').html(`
  <div class="wrapper">
      <div class="container">
        <header class="bookmark-controls">
          <button id="js-add-bookmark" class="addNew">Add New Bookmark</button>
          <select class="filterBy">Filter Bookmarks</select>
        </header>
        <div class="bookmark-container">
          <ul id="js-bookmark-list" class="bookmark-list">
          </ul>
        </div>
      </div>
    </div>`);
};

const addBookmarkPage = () => {
  return $('main').html(`
  <div class="wrapper">
  <div class="add-new-container">
    <form id="js-add-form" class="add-new-form">
      <h2 class="title">
        Add New Bookmark
      <h2>
      <span>
        <label for="add-title">Enter Title Here</label>
        <input id="js-add-bookmark-name" type="text" name="title" placeholder="Title" required>
      </span>
      <span>
        <label for="add-bookmark">Enter URL here</label>
        <input id="js-add-url" type="url" name="url" placeholder="http://website.com" required>
      </span>
      <span>
        <label for="rating">Enter Rating Here</label>
        <input id="js-add-rating" type="number" name="rating" placeholder="add rating" min="1" max="5" required>
      </span>
      <div class="text-description">
        <textarea id="js-add-desc" name="desc">Enter bookmark description here...</textarea>
      </div>
      <span>
        <button id="js-cancel">cancel</button>
      </span>
      <span>
        <button id="js-submit">submit</button>
      </span>

    </form>
  </div>
</div>
  `);
};

const generateBookmark = (bookmark) => {
  return `
    <li class="bookmark-item expanded" data-item-id="${bookmark.id}>
      <div class="title">
          ${bookmark.title}
      </div>
      <div class="rating">${bookmark.rating} out of 5</div>
    </li> 
  `;
};

const generateBookmarkString = (bookmarkList) => {
  const bookmarks = bookmarkList.map(bookmark => generateBookmark(bookmark));
  return bookmarks.join('');
};

// Main render function
const renderMainPage = () => {
  mainPage();
  const bookmarks = [...store.bookmarks];
  const bookmarksString = generateBookmarkString(bookmarks);
  $('#js-bookmark-list').html(bookmarksString);
};

const renderAddBookmark = () => {
  addBookmarkPage();
};


const handleAddingNewBookmark = () => {
  $('main').on('click', '#js-add-bookmark', (event) => {
    event.preventDefault();
    renderAddBookmark();
  });
};

const handleNewBookMarkSubmit = () => {
  // add new bookmark page submit form
  $('main').on('submit', '#js-add-form', (event) => {
    event.preventDefault();
    const newBookmark = $('#js-add-bookmark-name').val();
    api.createItem(newBookmark)
      .then(res => res.json())
      .then((newBookmark) => {
        store.addItem(newBookmark);
        renderMainPage();
      });
  });
  
};

function handleFormSubmit() {
  $('main').on('submit', '#js-add-form', event => {
    event.preventDefault();
    let formElement = $('#js-add-form')[0];
    const bookmarkJson = api.serializeJson(formElement);
    api.createBookMark(bookmarkJson)
      .then((bookmarkJson) => {
        store.addBookmark(bookmarkJson);
        renderMainPage();
      });
  });
}

const handleCancelButton = () => {
  $('main').on('click', '#js-cancel', (event) => {
    event.preventDefault();
    renderMainPage();
  });  
};

const bindEventListeners = () => {
  renderMainPage();
  handleAddingNewBookmark();
  handleCancelButton();
  handleFormSubmit();
};

export default {
  bindEventListeners,
  renderMainPage

};