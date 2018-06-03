import { NEWS_API_KEY } from "../../../tokens";

const BASE_URL = "https://technews-api.appspot.com";

export const get = (page) => {
  const params = {
    "news_api_key": NEWS_API_KEY,
    "page": page
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
  
  return fetch(`${BASE_URL}/api/v1/newslist`, request);
};