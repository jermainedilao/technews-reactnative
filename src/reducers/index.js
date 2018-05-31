import { combineReducers } from "redux";
import ArticleListReducer from "./ArticleListReducer";
import BookmarkListReducer from "./BookmarkListReducer";
import NavReducer from "./NavReducer";

export default combineReducers({
  nav: NavReducer,
  articleList: ArticleListReducer,
  bookmarkList: BookmarkListReducer
});