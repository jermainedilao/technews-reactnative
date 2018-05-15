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