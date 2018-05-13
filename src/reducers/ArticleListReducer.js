import React from "react";
import { ARTICLE_OPEN_URL_FAIL, ARTICLE_OPEN_URL_SUCCESS, ARTICLE_PRESS, ARTICLES_FETCH } from "../actions/types";


const INITIAL_STATE = {
  articleList: [],
  error: ""
};

export default (state = INITIAL_STATE, action) => {
  console.log(state);
  switch (action.type) {
    case ARTICLES_FETCH:
      console.log("ARTICLES_FETCH");
      console.log(action.payload);
      return { ...state, articleList: action.payload };
    case ARTICLE_OPEN_URL_FAIL:
      return { ...state, error: "Something went wrong while opening article." };
    case ARTICLE_OPEN_URL_SUCCESS:
    default:
      return state;
  }
}