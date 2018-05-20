import React, { Component } from "react";
import { FlatList, Text, View } from "react-native";
import { connect } from "react-redux";
import ArticleListItem from "./ArticleListItem";
import { articleBookmarkOrRemoveBookmark, articleOpen, fetchBookmarkList } from "../../actions";

class BookmarkList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Bookmarks"
    };
  };
  
  constructor() {
    super();
  }
  
  componentWillMount() {
    console.log("componentWillMount");
    this.fetchBookmarkList();
  }
  
  componentWillReceiveProps(nextProps) {
    const { error } = nextProps;
    
    if (error !== "") {
      console.log(error);
      alert(error);
    }
  }
  
  fetchBookmarkList = () => this.props.fetchBookmarkList();
  
  onArticleBookmarkPress = (article) => this.props.articleBookmarkOrRemoveBookmark(article);
  
  onArticlePress = (article) => this.props.articleOpen(article);
  
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
    let { bookmarkList } = this.props;
    
    if (bookmarkList.length === 0) bookmarkList = null;
    
    return (
      <FlatList
        data={bookmarkList}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => item.id}
        showsVerticalScrollIndicator={false}
        refreshing={this.props.refreshing}
        onRefresh={this.fetchBookmarkList}
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

const mapStateToProps = (state) => {
  const { bookmarkList, error, refreshing } = state.bookmarkList;
  
  return { bookmarkList, error, refreshing };
};

export default connect(mapStateToProps, {
  fetchBookmarkList, articleOpen, articleBookmarkOrRemoveBookmark
})(BookmarkList);
