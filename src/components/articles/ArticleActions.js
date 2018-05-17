import { BASE_URL } from "../../constants";
import { NEWS_API_KEY } from "../../tokens";
import { Linking, Platform } from "react-native";
import { ARTICLE_BOOKMARK, ARTICLE_OPEN_URL_FAIL, ARTICLE_OPEN_URL_SUCCESS } from "../../actions/types";
import { CustomTabs } from "react-native-custom-tabs";

/**
 * Fetches list of articles from BE.
 *
 * @return Promise Returns promise containing the response from network request.
 **/
export const articlesFetch = () => {
  const params = {
    "news_api_key": NEWS_API_KEY,
    "page": 1
  };
  
  const formBody = Object.keys(params).map(key => {
    return `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  }).join("&");
  
  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    body: formBody
  };
  
  return fetch(`${BASE_URL}/api/v1/newslist`, request)
};

/**
 * Opens article url in browser.
 *
 * @param article Article to be opened.
 *
 * @return Promise Returns promise determining whether it successfully opened browser or not.
 **/
export const articleOpen = (article) => {
  console.log("articleOpen");
  console.log(article);
  
  const { url } = article;
  
  console.log(url);
  
  // Temporary fix. Because of CustomTabs iOS issue..
  return Platform.OS === "ios" ? Linking.openURL(url) : CustomTabs.openURL(url);
};

/**
 * Updates article bookmark property to opposite of its current value.
 *
 * @return Article New article object with updated bookmark property.
 **/
export const articleBookmarkOrRemoveBookmark = (article) => {
  console.log("articleBookmarkOrRemoveBookmark");
  
  // Temporary workaround.
  // Replace with bookmarking inside DB then pass the new list from DB to reducers.
  return { ...article, bookmark: !article.bookmark};
};

/**
 * Replaces the article inside the list that has the same `id` with the `newArticle`.
 **/
export const replaceArticleById = (articleList, newArticle) => {
  return articleList.map((article) => {
    if (article.id === newArticle.id) {
      return newArticle;
    } else {
      return article;
    }
  });
};