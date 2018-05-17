import { createStackNavigator } from "react-navigation";
import ArticleList from "../components/articles/ArticleList";
import BookmarkList from "../components/articles/BookmarkList";
import { ROUTE_ARTICLE_LIST, ROUTE_BOOKMARK_LIST } from "./routes";
import { HEADER_BACKGROUND_COLOR, HEADER_BUTTON_ICON_COLOR } from "../styles";


const Routes = createStackNavigator({
  [ROUTE_ARTICLE_LIST]: {
    screen: ArticleList
  },
  [ROUTE_BOOKMARK_LIST]: {
    screen: BookmarkList
  }
}, {
  initialRouteName: ROUTE_ARTICLE_LIST,
  navigationOptions: {
    headerStyle: {
      backgroundColor: HEADER_BACKGROUND_COLOR,
    },
    headerTintColor: HEADER_BUTTON_ICON_COLOR
  }
});

export { Routes };