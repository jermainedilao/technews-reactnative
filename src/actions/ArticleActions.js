import { Platform, Linking } from "react-native";
import { CustomTabs } from "react-native-custom-tabs";
import { NEWS_API_KEY } from "../tokens";
import { ARTICLE_OPEN_URL_FAIL, ARTICLE_OPEN_URL_SUCCESS, ARTICLE_PRESS, ARTICLES_FETCH } from "./types";
import { BASE_URL } from "../constants";

/**
 * Fetches list of articles from BE.
 **/
export const articlesFetch = () => {
  return (dispatch) => {
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
        console.log(response);
        
        dispatch({
          type: ARTICLES_FETCH,
          payload: response.articles
        })
      })
      .catch((error) => {
        console.log(error);
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