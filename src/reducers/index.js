import { combineReducers } from "redux";
import ArticleListReducer from "./ArticleListReducer";

export default combineReducers({
  articleList: ArticleListReducer
});