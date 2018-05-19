import { BASE_URL } from "../../constants";
import { NEWS_API_KEY } from "../../tokens";
import { Linking, Platform } from "react-native";
import { CustomTabs } from "react-native-custom-tabs";

// https://github.com/facebook/immutable-js/issues/1305
import "core-js/es6/symbol";
import "core-js/fn/symbol/iterator";

import realm from "../../data/db/realm";
import { fetchBookmarkList, SCHEMA_ARTICLE } from "../../data/models";
import { convertArticleToArticleViewObject } from "../../Parser";

/**
 * Update's bookmark status of article from the list if `id` exists in bookmarked article from DB.
 *
 * @param articles List to update.
 **/
mapBookmarkedArticlesToList = (articles) => {
  let bookmarks = fetchBookmarkList();
  
  if (bookmarks.length === 0) return articles;
  
  return articles.map((article) => {
    for (let item of bookmarks) {
      if (item.id === article.id) {
        return { ...article, bookmark: true };
      }
    }
    return article;
  });
};

/**
 * Fetches list of articles from BE.
 *
 * @param onSuccess Callback function that receives the list of articles.
 * @param onError Callback function when error happens while fetching articles.
 **/
export const articlesFetch = (onSuccess, onError) => {
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
  
  fetch(`${BASE_URL}/api/v1/newslist`, request)
    .then((response) => response.json())
    .then((response) => {
      let articles = response.articles.map((article) => {
        return convertArticleToArticleViewObject(article)
      });
      
      articles = mapBookmarkedArticlesToList(articles);
      
      onSuccess(articles);
    }, (error) => {
      console.log(error);
      onError(error);
    })
    .catch((error) => {
      console.log(error);
      onError(error);
    });
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
 * @param article Article to bookmark.
 * @param onSuccess Callback function that receives the new article when bookmarking succeeds.
 * @param onError Callback function when error occurs while bookmarking.
 *
 * @return Article New article object with updated bookmark property.
 **/
export const articleBookmarkOrRemoveBookmark = (article, onSuccess, onError) => {
  console.log("articleBookmarkOrRemoveBookmark");
  
  const newArticle = { ...article, bookmark: !article.bookmark };
  console.log(newArticle);
  
  if (newArticle.bookmark) {
    realm.write(() => {
      let dbArticle = { ...newArticle, source: JSON.stringify(newArticle.source) };
      
      try {
        onSuccess(newArticle);
        realm.create(SCHEMA_ARTICLE, dbArticle);
      } catch (e) {
        onError(e)
      }
    });
  } else {
    realm.write(() => {
      try {
        onSuccess(newArticle);
        realm.delete(realm.objectForPrimaryKey(SCHEMA_ARTICLE, newArticle.id));
      } catch (e) {
        onError(e);
      }
    });
  }
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

/**
 * Removes the article inside the list that has the same `id` with the `newArticle`.
 **/
export const removeArticleById = (articleList, newArticle) => {
  return articleList.filter((article) => article.id !== newArticle.id);
};