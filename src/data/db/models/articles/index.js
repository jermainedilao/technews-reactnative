import realm, { SCHEMA_ARTICLE } from "../../realm";

export const insert = (article) => {
  realm.write(() => {
    let dbArticle = { ...article, source: JSON.stringify(article.source) };
    realm.create(SCHEMA_ARTICLE, dbArticle);
  });
};

export const remove = (article) => {
  realm.write(() => {
    realm.delete(realm.objectForPrimaryKey(SCHEMA_ARTICLE, article.id));
  });
};

export const fetch = () => realm.objects(SCHEMA_ARTICLE);