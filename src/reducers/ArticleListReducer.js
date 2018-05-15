import React from "react";
import {
  ARTICLE_BOOKMARK, ARTICLE_OPEN_URL_FAIL, ARTICLE_OPEN_URL_SUCCESS, ARTICLE_PRESS,
  ARTICLES_FETCH
} from "../actions/types";


const INITIAL_STATE = {
  articleList: [],
  error: ""
};

export default (state = INITIAL_STATE, action) => {
  console.log(state);
  console.log(action.type);
  console.log(action.payload);
  
  switch (action.type) {
    case ARTICLES_FETCH:
      return { ...state, articleList: action.payload };
    case ARTICLE_OPEN_URL_FAIL:
      return { ...state, error: "Something went wrong while opening article." };
    case ARTICLE_BOOKMARK:
      let articleList = replaceArticleById(state.articleList, action.payload);
      return { ...state, articleList };
    case ARTICLE_OPEN_URL_SUCCESS:
    default:
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