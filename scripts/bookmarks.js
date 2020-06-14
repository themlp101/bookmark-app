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
          <div class="filter-controls">
          <select id="js-filter-controls" name="filter" class="filterBy">
            <option>Filter By:</option>
            <option id="js-all" value="0">All</option>
            <option id="js-five-up" value="5">5 Stars</option>
            <option id="js-four-up" value="4">4+ Stars</option>
            <option id="js-three-up" value="3">3+ Stars</option>
            <option id="js-two-up" value="2">2+ Stars</option>
          </select>
          </div>
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
        <div class="error-container"></div>
        <label for="add-bookmark">Enter URL here</label>
        <input id="js-add-url" type="url" name="url" placeholder="http://website.com" required>
      </span>
      <span>
        <label for="rating">Enter Rating Here</label>
        <input id="js-add-rating" type="number" name="rating" min="1" max="5" required />
      </span>
      <div class="text-description">
        <textarea id="js-add-desc" name="desc" value="value" placeholder="Enter bookmark description here..." required ></textarea>
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
  if (!bookmark.expanded) {
    return `
    <li id="js-bookmark" class="bookmark-item " data-bookmark-id="${bookmark.id}">
      <div class="title">
          ${bookmark.title}
      </div>
      <div class="rating">${bookmark.rating} out of 5 Stars</div>
    </li> 
  `;} else {
    return `
      <li id="js-bookmark" class="bookmark-item expanded" data-bookmark-id="${bookmark.id}">
        <header class="bookmark-header">
          <div class="title">${bookmark.title}</div>
          <div class="rating">${bookmark.rating} out of 5</div>
          <button id="js-visit-link" class="visit"><a href=${bookmark.url}>Visit Site</a></button>
          <button id="js-delete" class="bookmark-delete">delete</button>
        </header>
        <div class="bookmark-desc">
          ${bookmark.desc}
        </div>`;
  }
};

const generateBookmarkString = (bookmarkList) => {
  const bookmarks = bookmarkList.map(bookmark => generateBookmark(bookmark));
  return bookmarks.join('');
};

const generateError = (message) => {
  return `
    <span class="erro-content">
      <button id="cancel-error">X</button>
      ${message}
      </span>`;
};

// Main render function
const renderMainPage = () => {
  mainPage();
  const bookmarksString = generateBookmarkString([...store.bookmarks]);
  $('#js-bookmark-list').html(bookmarksString);
};

const renderAddBookmark = () => {
  addBookmarkPage();
};

const renderError = function () {
  if (store.error) {
    const error = generateError(store.error);
    $('.error-container').html(error);
  } else {
    $('.error-container').empty();
  }
};


// Handle Functions

const handleCloseError = () => {
  $('main').on('click', '#cancel-error', () => {
    store.setError(null);
    renderError();
  });
};


/*
* Add New Bookmark Page
*/
const handleAddingNewBookmark = () => {
  $('main').on('click', '#js-add-bookmark', (event) => {
    event.preventDefault();
    renderAddBookmark();
  });
};

function handleFormSubmit() {
  $('main').on('submit', '#js-add-form', event => {
    event.preventDefault();
    let formElement = $('#js-add-form')[0];
    const bookmarkJson = api.serializeJson(formElement);
    api.createBookmark(bookmarkJson)
      .then((bookmarkJson) => {
        store.addBookmark(bookmarkJson);
        renderMainPage();
      })
      .catch((error) => {
        console.log(error);
        store.setError(error.message);
        renderError();
      });
  });
}

const handleCancelButton = () => {
  $('main').on('click', '#js-cancel', (event) => {
    event.preventDefault();
    renderMainPage();
  });  
};

/*
* Handle Toggle expanded view
*/
const getBookmarkId = (bookmark) => {
  return $(bookmark).closest('#js-bookmark').data('bookmark-id');
};

const handleToggleExpandedView = () => {
  $('main').on('click', '#js-bookmark', (event) => {
    const bookmarkId = getBookmarkId(event.currentTarget);
    const bookmark = store.findByID(bookmarkId);
    store.findAndUpdate(bookmarkId, { expanded: !bookmark.expanded} );
    renderMainPage();
  });
};

/*
* Handle Delete Bookmark
*/
const handleDeleteBookmark = () => {
  $('main').on('click', '#js-delete', (event) => {
    const bookmarkId = getBookmarkId(event.currentTarget);
    api.deleteBookmark(bookmarkId)
      .then(() => {
        store.findAndDelete(bookmarkId);
        renderMainPage();
      });
  });
};

/*
* Handle Filter Bookmarks
*/

const handleFilterByRating = () => {
  $('main').on('change', '#js-filter-controls', (event) => {
    event.preventDefault();
    const rating = $('#js-filter-controls').val();
    store.setRatingFilter(rating);
    renderMainPage();
  });
};

const bindEventListeners = () => {
  renderMainPage();
  handleAddingNewBookmark();
  handleCancelButton();
  handleFormSubmit();
  handleToggleExpandedView();
  handleDeleteBookmark();
  handleFilterByRating();
  handleCloseError();
};

export default {
  bindEventListeners,
  renderMainPage

};