/**
 * Converts article from BE to ArticleViewObject.
 *
 * Adds id property to article object.
 **/
import { VIEW_TYPE_ARTICLE, VIEW_TYPE_ATTRIBUTION } from "../../constants";

export const convertArticleToArticleViewObject = (article) => {
  let articleViewObject = { ...article };
  articleViewObject.id = `${articleViewObject.publishedAt}${articleViewObject.title}`;
  articleViewObject.bookmark = false;
  articleViewObject.viewType = VIEW_TYPE_ARTICLE;
  return articleViewObject;
};

export const convertArticleDbModelToViewObject = (article) => {
  let articleViewObject = Object.assign({}, article);
  articleViewObject.source = article.getSource();
  articleViewObject.viewType = VIEW_TYPE_ARTICLE;
  return articleViewObject;
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

/**
 * Appends NewsAPI attribution in the list.
 **/
export const addNewsApiAttribution = (articleList) => {
  let attribution = {
    id: `${VIEW_TYPE_ATTRIBUTION}${articleList.length}`,
    viewType: VIEW_TYPE_ATTRIBUTION
  };
  articleList.push(attribution);
  return articleList;
};