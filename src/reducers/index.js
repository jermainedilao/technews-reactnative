import { combineReducers } from "redux";
import ArticleListReducer from "./ArticleListReducer";
import BookmarkListReducer from "./BookmarkListReducer";

export default combineReducers({
  articleList: ArticleListReducer,
  bookmarkList: BookmarkListReducer
});