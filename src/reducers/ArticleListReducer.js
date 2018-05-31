import {
  ARTICLE_BOOKMARK, ARTICLE_BOOKMARK_FAIL, ARTICLE_OPEN_URL_FAIL, ARTICLE_OPEN_URL_SUCCESS, ARTICLE_PRESS,
  ARTICLE_UNBOOKMARK, ARTICLE_UNBOOKMARK_FAIL,
  ARTICLES_FETCH, ARTICLES_FETCH_FAIL, ARTICLES_FETCH_START
} from "../actions/types";


const INITIAL_STATE = {
  /**
   * Used in paginating article list.
   **/
  page: 0,
  /**
   * Articles to display in flat list.
   **/
  articleList: [],
  error: "",
  /**
   * Refreshing state of flat list.
   **/
  refreshing: false,
  footerIndicator: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ARTICLES_FETCH_START:
      return { ...state, refreshing: action.payload.page <= 1, footerIndicator: action.payload.page > 1 };
    case ARTICLES_FETCH_FAIL:
      return { ...state, error: action.payload };
    case ARTICLES_FETCH:
      if (action.payload.page === 1) {
        // If fetching page 1, return fresh list.
        return {
          ...state,
          articleList: action.payload.articleList,
          refreshing: false,
          page: action.payload.page,
          footerIndicator: false
        };
      }
      
      const newArticleList = [];
      newArticleList.push(...state.articleList); // Currently shown list.
      newArticleList.push(...action.payload.articleList); // For new page from pagination.
      return {
        ...state,
        articleList: newArticleList,
        refreshing: false,
        page: action.payload.page,
        footerIndicator: false
      };
    case ARTICLE_OPEN_URL_FAIL:
      return { ...state, error: "Something went wrong while opening article." };
    case ARTICLE_BOOKMARK:
    case ARTICLE_UNBOOKMARK:
      let articleList = replaceArticleById(state.articleList, action.payload);
      return { ...state, articleList };
    case ARTICLE_BOOKMARK_FAIL:
      return { ...state, error: "Something went wrong while bookmarking article." };
    case ARTICLE_UNBOOKMARK_FAIL:
      return { ...state, error: "Something went wrong while removing article bookmark." };
    case ARTICLE_OPEN_URL_SUCCESS:
    default:
      console.log("default");
      return state;
  }
}

/**
 * Replaces the article inside the list that has the same `id` with the `newArticle`.
 **/
const replaceArticleById = (articleList, newArticle) => {
  return articleList.map((article) => {
    if (article.id === newArticle.id) {
      return newArticle;
    } else {
      return article;
    }
  });
};