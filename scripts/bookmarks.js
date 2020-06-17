/*
 * Render Functions to display information to the DOM
 *
 */

import store from './store.js';
import api from './api.js';

/**
 *
 *
 *
 *
 * Template Render Functions
 *
 *
 *
 */
/**
 * Main Page
 */
const mainPage = () => {
	return $('main').html(`
  <div class="wrapper">
      <div class="container">
        <header class="bookmark-controls">
          <button id="js-add-bookmark" class="addNew">Add New Bookmark</button>
          <div class="filter-controls">
          <form class="controls-form">
          <label for="filter">
          Filter:
          </label>
          <select id="js-filter-controls" name="filter" class="filterBy">
            <option value="0">Filter By:</option>
            <option value="0">All</option>
            <option value="5">5 Stars</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
          </select>
          </form>
          </div>
        </header>
        <div class="bookmark-container">
          <ul id="js-bookmark-list" class="bookmark-list">
          </ul>
        </div>
      </div>
    </div>`);
};
/**
 * Add bookmark page template
 */
const addBookmarkPage = () => {
	return $('main').html(`
  <div class="wrapper">
  <div class="add-new-container">
    <form id="js-add-form" name="add-form" class="add-new-form">
    <h2 class="title">Add New Bookmark<h2>
      <span>
        <label for="title">Enter Title Here</label>
        <input id="js-add-bookmark-name" type="text" name="title" placeholder="Title" required>
      </span>
      <span>
        <div id="error-container"></div>
        <label for="url">Enter URL here</label>
        <input id="js-add-url" type="url" name="url" placeholder="http://website.com" required>
      </span>
      <span>
        <label for="rating">Enter Rating Here</label>
        <input id="js-add-rating" type="number" name="rating" min="1" max="5" required />
      </span>
      <div class="text-description">
      <label for="desc">Enter bookmark description:</label>
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
/**
 * Renders normal state for bookmark
 * @param {object} bookmark
 */
const normal = (bookmark) => {
	return `
  <li id="js-bookmark" class="bookmark-item " data-bookmark-id="${bookmark.id}">
    <div class="title">
        ${bookmark.title}
    </div>
    <div class="rating">${bookmark.rating} out of 5 Stars</div>
  </li> 
`;
};
/**
 * Renders expanded state for the bookmark
 * @param {object} bookmark
 */
const expanded = (bookmark) => {
	return `
      <li id="js-bookmark" class="bookmark-item expanded" data-bookmark-id="${bookmark.id}">
        <header class="bookmark-header">
          <div class="title">${bookmark.title}</div>
          <div class="rating">${bookmark.rating} out of 5</div>
          
        </header>
        <div class="bookmark-desc">
          ${bookmark.desc}
        </div>
        <div class="bookmark-expanded-controls">
            <button id="js-delete" class="bookmark-delete">delete</button>
            <button id="js-visit-link" class="visit"><a href=${bookmark.url}>Visit Site</a></button>
        </div>`;
};
/**
 * Renders hidden state for the bookmark
 * @param {object} bookmark
 */
const hidden = (bookmark) => {
	return `<li id="js-bookmark" class="bookmark-item hidden" data-bookmark-id="${bookmark.id}">
    <div class="title">
        ${bookmark.title}
    </div>
    <div class="rating">${bookmark.rating} out of 5 Stars</div>
  </li> `;
};
/**
 * Conditional function that determines render state for the bookmark
 * @param {object} bookmark
 */
const generateBookmark = (bookmark) => {
	if (bookmark.hidden) {
		return hidden(bookmark);
	} else if (!bookmark.expanded) {
		return normal(bookmark);
	} else {
		return expanded(bookmark);
	}
};

/**
 * Generates a string from the passed in array
 * @param {array} bookmarkList
 */
const generateBookmarkString = (bookmarkList) => {
	const bookmarks = bookmarkList.map((bookmark) => generateBookmark(bookmark));
	return bookmarks.join('');
};
/**
 * Template for the error box
 * @param {string} message
 */
const generateError = (message) => {
	return `
    <span class="erro-content">
      <button id="cancel-error">X</button>
      ${message}
      </span>`;
};
/**
 *
 * Main render function
 *
 */
const renderMainPage = () => {
	mainPage();
	const bookmarkList = store.getBookmarks();
	const bookmarksString = generateBookmarkString(bookmarkList);
	$('#js-bookmark-list').html(bookmarksString);
};
/**
 * Retrieves template for the add bookmark page
 */
const renderAddBookmark = () => {
	addBookmarkPage();
};

/**
 *
 *
 * Handler Functions
 *
 *
 *
 */

/**
 * Handles close functionality on the add bookmark page
 */
const handleCloseError = () => {
	$('main').on('click', '#cancel-error', () => {
		store.setError(null);
		renderError();
	});
};

/**
 * Handles action to render the add bookmark page
 */
const handleAddingNewBookmark = () => {
	$('main').on('click', '#js-add-bookmark', (event) => {
		event.preventDefault();
		renderAddBookmark();
	});
};
/**
 * Handles submit button on add bookmark page
 * Makes a call to the api
 * Converts the object and POSTS to the api and store array
 */
const handleFormSubmit = () => {
	$('main').on('submit', '#js-add-form', (event) => {
		event.preventDefault();
		let formElement = $('#js-add-form')[0];
		const bookmarkJson = api.serializeJson(formElement);
		api
			.createBookmark(bookmarkJson)
			.then((bookmarkJson) => {
				store.addBookmark(bookmarkJson);
				api.getBookmarks();
				renderMainPage();
			})
			.catch((error) => {
				store.setError(error.message);
				renderError();
			});
	});
};
/**
 * Renders the error above the html-url input container
 */
const renderError = function () {
	const errorMessage = store.getErrorMessage();
	if (errorMessage) {
		const error = generateError(errorMessage);
		$('#error-container').html(error);
	} else {
		$('#error-container').empty();
	}
};

/**
 * Handles cancel button on the add bookmark page
 */
const handleCancelButton = () => {
	$('main').on('click', '#js-cancel', (event) => {
		event.preventDefault();
		renderMainPage();
	});
};

/**
 * Finds the closet list item's id
 * @param {element} bookmark
 */
const getBookmarkId = (bookmark) => {
	return $(bookmark).closest('#js-bookmark').data('bookmark-id');
};
/**
 * Handles the toggled expanded view for the booksmarks
 * Retrieves the id from the currently clicked bookmark and updates the object in the bookmarks array
 * Re-renders the page with the appropraite styling for the current bookmark
 */
const handleToggleExpandedView = () => {
	$('main').on('click', '#js-bookmark', (event) => {
		const bookmarkId = $(event.currentTarget).data('bookmark-id');
		const bookmark = store.findByID(bookmarkId);
		if (bookmark) {
			store.findAndUpdate(bookmarkId, { expanded: !bookmark.expanded });
		}
		renderMainPage();
	});
};

/**
 * Handles the deletion of the bookmarks
 * Retrieves the clicked specific bookmark's id
 * Makes a DELETE call to the api and deletes the bookmark from the bookmarks array in store
 */
const handleDeleteBookmark = () => {
	$('main').on('click', '#js-delete', (event) => {
		const bookmarkId = getBookmarkId(event.currentTarget);
		api.deleteBookmark(bookmarkId).then(() => {
			store.findAndDelete(bookmarkId);
			renderMainPage();
		});
	});
};

/**
 * Handles the filter feature
 * Retrieves the rating passed in by the user and toggles the hidden *property per bookmark based on rating
 * Re-renders the page with appropriate hidden styling for the filtered bookmarks
 */
const handleFilterByRating = () => {
	$('main').on('change', '#js-filter-controls', (event) => {
		const rating = $('#js-filter-controls').val();
		store.setRatingFilter(rating);
		renderMainPage();
	});
};

/**
 * Binding all event listeners and handle functions
 */
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
	renderMainPage,
};
