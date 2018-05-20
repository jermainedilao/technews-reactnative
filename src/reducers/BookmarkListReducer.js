import {
  ARTICLE_OPEN_URL_FAIL, ARTICLE_UNBOOKMARK, ARTICLE_UNBOOKMARK_FAIL, BOOKMARKS_FETCH, BOOKMARKS_FETCH_FAIL,
  BOOKMARKS_FETCH_START
} from "../actions/types";

const INITIAL_STATE = {
  bookmarkList: [],
  error: "",
  refreshing: false
};

export default (state = INITIAL_STATE, action) => {
  console.log(state);
  console.log(action.type);
  console.log(state.payload);
  
  switch (action.type) {
    case BOOKMARKS_FETCH_START:
      return { ...state, refreshing: true };
    case BOOKMARKS_FETCH:
      // Do not use Realm objects in displaying flat list.
      // https://github.com/realm/realm-js/issues/1031
      const bookmarkList = action.payload.map((article) => {
        return Object.assign({}, article);
      });
      return { ...state, bookmarkList, refreshing: false };
    case BOOKMARKS_FETCH_FAIL:
      return { ...state, error: "Something went wrong while fetching bookmark list." };
    case ARTICLE_OPEN_URL_FAIL:
      return { ...state, error: "Something went wrong while opening the article." };
    case ARTICLE_UNBOOKMARK:
      return { ...state, bookmarkList: removeArticleById(state.bookmarkList, action.payload) };
    case ARTICLE_UNBOOKMARK_FAIL:
      return { ...state, error: "Something went wrong while removing article bookmark." };
    default:
      return state;
  }
}

/**
 * Removes the article inside the list that has the same `id` with the `newArticle`.
 **/
const removeArticleById = (bookmarkList, newArticle) => {
  return bookmarkList.filter((article) => article.id !== newArticle.id);
};