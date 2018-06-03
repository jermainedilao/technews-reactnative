/**
 * Converts article from BE to ArticleViewObject.
 *
 * Adds id property to article object.
 **/
export const convertArticleToArticleViewObject = (article) => {
  article.id = `${article.publishedAt}${article.title}`;
  article.bookmark = false;
  return article;
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