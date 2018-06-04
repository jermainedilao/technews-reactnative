import React, { PureComponent } from "react";
import { FlatList, Text, View } from "react-native";
import { connect } from "react-redux";
import ArticleListItem from "../../components/ArticleListItem";
import { articleBookmarkOrRemoveBookmark, articleOpen, fetchBookmarkList } from "../../../../data/articles/actions";

class BookmarkList extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Bookmarks"
    };
  };
  
  constructor() {
    super();
    
    this.state = {
      /**
       * Refreshing state of flat list.
       **/
      refreshing: true
    };
  }
  
  componentWillMount() {
    this.fetchBookmarkList();
  }
  
  componentWillReceiveProps(nextProps) {
    const { error, bookmarkList } = nextProps;
    
    if (error !== "") {
      alert(error);
    }
    
    if (bookmarkList != null) {
      this.setState({ refreshing: false });
    }
  }
  
  fetchBookmarkList = () => this.props.fetchBookmarkList();
  
  onArticleBookmarkPress = (article) => this.props.articleBookmarkOrRemoveBookmark(article, true);
  
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
        refreshing={this.state.refreshing}
        onRefresh={this.fetchBookmarkList}
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

const mapStateToProps = (state) => {
  const { bookmarkList, error } = state.data.articleList;
  
  return { bookmarkList, error };
};

export default connect(mapStateToProps, {
  fetchBookmarkList, articleOpen, articleBookmarkOrRemoveBookmark
})(BookmarkList);
