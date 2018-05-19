import realm from "../db/realm";

export const SCHEMA_ARTICLE = "Article";

class Article {
  getSource = () => {
    return JSON.parse(this.source)
  };
}

Article.schema = {
  name: SCHEMA_ARTICLE,
  primaryKey: "id",
  properties: {
    id: "string",
    title: "string",
    source: "string", // JSON string { id: <id>, name: <name> }
    description: "string",
    author: "string",
    url: "string",
    urlToImage: "string",
    publishedAt: "string",
    bookmark: "bool"
  }
};

export const fetchBookmarkList = () => {
  return realm.objects(SCHEMA_ARTICLE)
};

export { Article };
