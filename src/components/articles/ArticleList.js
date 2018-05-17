import React, { Component } from "react";
import { FlatList, StatusBar, View } from "react-native";
import HeaderButtons from "react-navigation-header-buttons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ArticleListItem from "./ArticleListItem";
import {
  articleBookmarkOrRemoveBookmark,
  articleOpen,
  articlesFetch,
  replaceArticleById
} from "./ArticleActions";
import { convertArticleToArticleViewObject } from "../../Parser";
import {
  DEFAULT_HEADER_BUTTON_ICON_SIZE,
  HEADER_BUTTON_ICON_COLOR,
  setStatusBarStyle
} from "../../styles";
import { ROUTE_BOOKMARK_LIST } from "../../routes";

class ArticleList extends Component {
  // Used by react-navigation
  static navigationOptions = ({ navigation }) => {
    // Use `navigation.state` to get parameters passed from previous screen.
    // Or if inside the component use `this.props.navigation.getParam(<param_key>, <default_value>)`.
    const params = navigation.state.params || {};
    
    return {
      title: "TechNews", // Action bar title.
      headerBackTitle: "Back", // Action bar back button text for the next screen.
      headerRight: (
        <HeaderButtons
          IconComponent={MaterialIcons}
          left={false}
          color={HEADER_BUTTON_ICON_COLOR}
          iconSize={DEFAULT_HEADER_BUTTON_ICON_SIZE}
        >
          <HeaderButtons.Item
            title="Bookmarks"
            show="always"
            iconName="collections-bookmark"
            onPress={() => params.onBookmarkHeaderButtonPress()}
          />
        </HeaderButtons>
      )
    };
  };
  
  constructor() {
    super();
    setStatusBarStyle();
    
    // Initial state.
    this.state = {
      /**
       * List of articles to be displayed.
       **/
      articleList: [],
      /**
       * Error message to be displayed.
       **/
      error: "", // Display using snack.
      refreshing: false
    }
  }
  
  componentWillMount() {
    this.props.navigation.setParams({
      onBookmarkHeaderButtonPress: this.onBookmarkHeaderButtonPress
    });
    this.articlesFetch();
  }
  
  onBookmarkHeaderButtonPress = () => this.props.navigation.navigate(ROUTE_BOOKMARK_LIST);
  
  articlesFetch = () => {
    this.setState({
      refreshing: true
    });
    
    articlesFetch()
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        
        let articles = response.articles.map((article) => {
          return convertArticleToArticleViewObject(article)
        });
        
        this.setState({
          articleList: articles,
          refreshing: false
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error,
          refreshing: false
        })
      });
  };
  
  onArticleBookmarkPress = (article) => {
    let newArticle = articleBookmarkOrRemoveBookmark(article);
    let newArticleList = replaceArticleById(this.state.articleList, newArticle);
    
    this.setState({
      ...this.state,
      articleList: newArticleList
    });
  };
  
  onArticlePress = (article) => {
    articleOpen(article)
      .then((launched) => {
        console.log(`Launched browser: ${launched}`);
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: "Something went wrong while opening article."
        });
      });
  };
  
  renderItem = ({ item }) => {
    return (
      <ArticleListItem
        article={item}
        onBookmarkPress={this.onArticleBookmarkPress}
        onArticlePress={this.onArticlePress}
      />
    );
  };
  
  renderView = () => {
    let { articleList } = this.state;
    
    console.log("renderView");
    
    if (articleList.length === 0) articleList = null;
    
    return (
      <FlatList
        data={articleList}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => item.id}
        showsVerticalScrollIndicator={false}
        refreshing={this.state.refreshing}
        onRefresh={this.articlesFetch}
      />
    );
  };
  
  render() {
    const { containerStyle } = styles;
    
    return (
      <View style={containerStyle}>
        {this.renderView()}
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  }
};

export default ArticleList;