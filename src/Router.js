import { StackNavigator } from "react-navigation";
import ArticleList from "./components/articles/ArticleList";


export default StackNavigator({
  ArticleList: {
    screen: ArticleList,
    navigationOptions: () => ({
      title: "TechNews"
    })
  }
});