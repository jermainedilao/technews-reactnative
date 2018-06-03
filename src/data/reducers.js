import ArticleListReducer from "./articles/reducers";
import { combineReducers } from "redux";

export default combineReducers({
  articleList: ArticleListReducer,
});