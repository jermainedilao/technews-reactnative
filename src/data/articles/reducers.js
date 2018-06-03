import {
  ARTICLE_BOOKMARK, ARTICLE_BOOKMARK_FAIL, ARTICLE_OPEN_URL_FAIL, ARTICLE_OPEN_URL_SUCCESS,
  ARTICLE_UNBOOKMARK, ARTICLE_UNBOOKMARK_FAIL,
  ARTICLES_FETCH, ARTICLES_FETCH_FAIL, BOOKMARKS_FETCH, BOOKMARKS_FETCH_FAIL
} from "./actionTypes";
import {
  replaceArticleById, removeArticleById
} from "../../utils/parser"


const INITIAL_STATE = {
  /**
   * Used in paginating article list.
   **/
  page: 0,
  /**
   * Articles to display in flat list.
   **/
  articleList: [],
  bookmarkList: [],
  error: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ARTICLES_FETCH_FAIL:
      return { ...state, error: action.payload };
    
    case ARTICLES_FETCH:
      if (action.payload.page === 1) {
        // If fetching page 1, return fresh list.
        return {
          ...state,
          articleList: action.payload.articleList,
          page: action.payload.page,
        };
      }
      
      const newArticleList = [];
      newArticleList.push(...state.articleList); // Currently shown list.
      newArticleList.push(...action.payload.articleList); // For new page from pagination.
      return {
        ...state,
        articleList: newArticleList,
        page: action.payload.page,
      };
    
    case ARTICLE_OPEN_URL_FAIL:
      return { ...state, error: "Something went wrong while opening article." };
    
    case ARTICLE_BOOKMARK:
      return {
        ...state,
        articleList: replaceArticleById(state.articleList, action.payload.article)
      };
    
    case ARTICLE_UNBOOKMARK:
      if (action.payload.fromBookmarkList) {
        return {
          ...state,
          articleList: replaceArticleById(state.articleList, action.payload.article),
          bookmarkList: removeArticleById(state.bookmarkList, action.payload.article)
        };
      } else {
        return {
          ...state,
          articleList: replaceArticleById(state.articleList, action.payload.article)
        };
      }
    
    case ARTICLE_BOOKMARK_FAIL:
      return { ...state, error: "Something went wrong while bookmarking article." };
    
    case ARTICLE_UNBOOKMARK_FAIL:
      return { ...state, error: "Something went wrong while removing article bookmark." };
    
    // BOOKMARK LIST ACTIONS
    
    case BOOKMARKS_FETCH:
      // Do not use Realm objects in displaying flat list.
      // https://github.com/realm/realm-js/issues/1031
      const bookmarkList = action.payload.map((article) => {
        return Object.assign({}, article);
      });
      return { ...state, bookmarkList };
    
    case BOOKMARKS_FETCH_FAIL:
      return { ...state, error: "Something went wrong while fetching bookmark list." };
    
    case ARTICLE_OPEN_URL_SUCCESS:
    default:
      console.log("default");
      return state;
  }
}