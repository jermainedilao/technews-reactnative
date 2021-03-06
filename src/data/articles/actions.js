import { Linking, Platform } from "react-native";
import { CustomTabs } from "react-native-custom-tabs";

// https://github.com/facebook/immutable-js/issues/1305
import "core-js/es6/symbol";
import "core-js/fn/symbol/iterator";

import * as articlesApi from "../../services/articles/api";
import { addNewsApiAttribution, convertArticleDbModelToViewObject, convertArticleToArticleViewObject } from "./parser";
import {
  ARTICLE_BOOKMARK,
  ARTICLE_BOOKMARK_FAIL,
  ARTICLE_OPEN_URL_FAIL,
  ARTICLE_OPEN_URL_SUCCESS,
  ARTICLE_UNBOOKMARK,
  ARTICLE_UNBOOKMARK_FAIL,
  ARTICLES_FETCH,
  ARTICLES_FETCH_FAIL,
  BOOKMARKS_FETCH,
  BOOKMARKS_FETCH_FAIL
} from "./actionTypes";
import * as articlesDb from "../db/models/articles";

/**
 * Update's bookmark status of article from the list if `id` exists in bookmarked article from DB.
 *
 * @param articles List to update.
 **/
const mapBookmarkedArticlesToList = (articles) => {
  let bookmarks = articlesDb.fetch();
  
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
 * @param page Page to fetch.
 **/
export const articlesFetch = (page) => {
  return (dispatch) => {
    articlesApi.get(page)
      .then((response) => {
        console.log("received response");
        console.log(response);
        return response.articles.map((article) => {
          return convertArticleToArticleViewObject(article)
        });
      })
      .then((articleList) => {
        console.log("mapping bookmarked articles");
        return mapBookmarkedArticlesToList(articleList);
      })
      .then((articleList) => {
        console.log("dispatching action");
        dispatch({
          type: ARTICLES_FETCH,
          payload: {
            page,
            articleList
          }
        })
      }, (error) => {
        dispatch({ type: ARTICLES_FETCH_FAIL, payload: error });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: ARTICLES_FETCH_FAIL, payload: error });
      });
  }
};

/**
 * Opens article url in browser.
 *
 * @param article Article to be opened.
 **/
export const articleOpen = (article) => {
  
  const { url } = article;
  
  
  return (dispatch) => {
    // Temporary fix. Because of CustomTabs iOS issue..
    let promise = Platform.OS === "ios" ? Linking.openURL(url) : CustomTabs.openURL(url);
    
    promise
      .then((launched) => {
        dispatch({
          type: ARTICLE_OPEN_URL_SUCCESS
        })
      })
      .catch((error) => {
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
 * @param fromBookmarkList Pass true when calling from bookmark list screen.
 **/
export const articleBookmarkOrRemoveBookmark = (article, fromBookmarkList = false) => {
  return (dispatch) => {
    const newArticle = { ...article, bookmark: !article.bookmark };
    
    if (newArticle.bookmark) {
      try {
        articlesDb.insert(newArticle);
        dispatch({
          type: ARTICLE_BOOKMARK,
          payload: {
            article: newArticle,
            fromBookmarkList
          }
        });
      } catch (e) {
        dispatch({ type: ARTICLE_BOOKMARK_FAIL });
      }
    } else {
      try {
        articlesDb.remove(newArticle);
        dispatch({
          type: ARTICLE_UNBOOKMARK,
          payload: {
            article: newArticle,
            fromBookmarkList
          }
        });
      } catch (e) {
        dispatch({ type: ARTICLE_UNBOOKMARK_FAIL });
      }
    }
  };
};

/**
 * Fetches list of bookmarked articles.
 **/
export const fetchBookmarkList = () => {
  return (dispatch) => {
    try {
      let bookmarkList = articlesDb.fetch();
      
      // Do not use Realm objects in displaying flat list.
      // https://github.com/realm/realm-js/issues/1031
      bookmarkList = bookmarkList.map((article) => {
        return convertArticleDbModelToViewObject(article);
      });
      
      dispatch({
        type: BOOKMARKS_FETCH,
        payload: bookmarkList
      });
    } catch (e) {
      console.log(e);
      dispatch({ type: BOOKMARKS_FETCH_FAIL });
    }
  };
};