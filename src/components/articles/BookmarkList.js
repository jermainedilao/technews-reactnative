import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import { fetchBookmarkList } from "../../data/models";
import ArticleListItem from "./ArticleListItem";
import { articleBookmarkOrRemoveBookmark, articleOpen, removeArticleById, replaceArticleById } from "./ArticleActions";

class BookmarkList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Bookmarks"
    };
  };
  
  constructor() {
    super();
    
    this.state = {
      bookmarkList: [],
      error: ""
    };
  }
  
  componentWillMount() {
    console.log("componentWillMount");
    const bookmarkList = fetchBookmarkList();
    
    if (bookmarkList.length === 0) return;
  
    this.setState({
      bookmarkList
    });
  }
  
  onArticleBookmarkPress = (article) => {
    articleBookmarkOrRemoveBookmark(
      article, (newArticle) => {
        let newBookmarkList = removeArticleById(this.state.bookmarkList, newArticle);
        
        this.setState({
          ...this.state,
          bookmarkList: newBookmarkList
        });
      }, (error) => {
        console.log(error);
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
    let { bookmarkList } = this.state;
    
    if (bookmarkList.length === 0) bookmarkList = null;
    
    return (
      <FlatList
        data={bookmarkList}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => item.id}
        showsVerticalScrollIndicator={false}
        refreshing={this.state.refreshing}
        onRefresh={this.articlesFetch}
      />
    );
  };
  
  render() {
    console.log("render");
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

export default BookmarkList;