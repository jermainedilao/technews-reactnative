import { Platform, Linking } from "react-native";
import { CustomTabs } from "react-native-custom-tabs";

// https://github.com/facebook/immutable-js/issues/1305
import "core-js/es6/symbol";
import "core-js/fn/symbol/iterator";

import { NEWS_API_KEY } from "../tokens";
import {
  ARTICLE_BOOKMARK, ARTICLE_BOOKMARK_FAIL, ARTICLE_OPEN_URL_FAIL, ARTICLE_OPEN_URL_SUCCESS, ARTICLE_PRESS,
  ARTICLE_UNBOOKMARK,
  ARTICLE_UNBOOKMARK_FAIL,
  ARTICLES_FETCH, ARTICLES_FETCH_FAIL, ARTICLES_FETCH_START, BOOKMARKS_FETCH, BOOKMARKS_FETCH_FAIL,
  BOOKMARKS_FETCH_START
} from "./types";
import { BASE_URL } from "../constants";
import { convertArticleToArticleViewObject } from "../Parser";
import realm from "../data/db/realm";
import { fetchBookmarkList as modelFetchBookmarkList, SCHEMA_ARTICLE } from "../data/models";

/**
 * Update's bookmark status of article from the list if `id` exists in bookmarked article from DB.
 *
 * @param articles List to update.
 **/
mapBookmarkedArticlesToList = (articles) => {
  let bookmarks = modelFetchBookmarkList();
  
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
 **/
export const articlesFetch = () => {
  return (dispatch) => {
    dispatch({
      type: ARTICLES_FETCH_START
    });
    
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
        
        dispatch({
          type: ARTICLES_FETCH,
          payload: articles
        })
      }, (error) => {
        console.log(error);
        dispatch({ type: ARTICLES_FETCH_FAIL, payload: error });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ARTICLES_FETCH_FAIL, payload: error });
      });
  };
};

/**
 * Opens article url in browser.
 *
 * @param article Article to be opened.
 **/
export const articleOpen = (article) => {
  console.log("articleOpen");
  console.log(article);
  
  const { url } = article;
  
  console.log(url);
  
  return (dispatch) => {
    // Temporary fix. Because of CustomTabs iOS issue..
    let promise = Platform.OS === "ios" ? Linking.openURL(url) : CustomTabs.openURL(url);
    
    promise
      .then((launched) => {
        console.log(`Launched custom tabs: ${launched}`);
        dispatch({
          type: ARTICLE_OPEN_URL_SUCCESS
        })
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: ARTICLE_OPEN_URL_FAIL
        })
      });
  };
};

/**
 * Updates article bookmark property to opposite of its current value.
 *
 * @param article Article to bookmark.
 **/
export const articleBookmarkOrRemoveBookmark = (article) => {
  console.log("articleBookmarkOrRemoveBookmark");
  
  return (dispatch) => {
    const newArticle = { ...article, bookmark: !article.bookmark };
    console.log(newArticle);
    
    if (newArticle.bookmark) {
      realm.write(() => {
        let dbArticle = { ...newArticle, source: JSON.stringify(newArticle.source) };
        
        try {
          realm.create(SCHEMA_ARTICLE, dbArticle);
          dispatch({
            type: ARTICLE_BOOKMARK,
            payload: newArticle
          });
        } catch (e) {
          dispatch({ type: ARTICLE_BOOKMARK_FAIL });
        }
      });
    } else {
      realm.write(() => {
        try {
          realm.delete(realm.objectForPrimaryKey(SCHEMA_ARTICLE, newArticle.id));
          dispatch({
            type: ARTICLE_UNBOOKMARK,
            payload: newArticle
          });
        } catch (e) {
          console.log(e);
          dispatch({ type: ARTICLE_UNBOOKMARK_FAIL });
        }
      });
    }
  };
};

/**
 * Fetches list of bookmarked articles.
 **/
export const fetchBookmarkList = () => {
  return (dispatch) => {
    dispatch({ type: BOOKMARKS_FETCH_START });
    try {
      dispatch({
        type: BOOKMARKS_FETCH,
        payload: modelFetchBookmarkList()
      });
    } catch (e) {
      dispatch({ type: BOOKMARKS_FETCH_FAIL });
    }
  };
};