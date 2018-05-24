import React, { PureComponent } from "react";
import { ActivityIndicator, FlatList, StatusBar, View } from "react-native";
import { connect } from "react-redux";
import HeaderButtons from "react-navigation-header-buttons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ArticleListItem from "./ArticleListItem";
import { articleBookmarkOrRemoveBookmark, articleOpen, articlesFetch } from "../../actions";
import { DEFAULT_HEADER_BUTTON_ICON_SIZE, HEADER_BUTTON_ICON_COLOR } from "../../styles";
import { ROUTE_BOOKMARK_LIST } from "../../routes";

class ArticleList extends PureComponent {
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
    this.onEndReachedCalledDuringMomentum = true;
  }
  
  componentWillMount() {
    this.props.navigation.setParams({
      onBookmarkHeaderButtonPress: this.onBookmarkHeaderButtonPress
    });
    this.articlesFetch(1); // Fetch first page.
  }
  
  componentWillReceiveProps(nextProps) {
    const { error } = nextProps;
    
    if (error !== "") {
      console.log(error);
      alert(error);
    }
  }
  
  onBookmarkHeaderButtonPress = () => this.props.navigation.navigate(ROUTE_BOOKMARK_LIST);
  
  articlesFetch = (page) => this.props.articlesFetch(page);
  
  onArticleBookmarkPress = (article) => this.props.articleBookmarkOrRemoveBookmark(article);
  
  onArticlePress = (article) => this.props.articleOpen(article);
  
  onEndReached = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      console.log("onEndReached");
      this.onEndReachedCalledDuringMomentum = true;
      this.articlesFetch(this.props.page + 1) // Fetch next page.
    }
  };
  
  onRefresh = () => {
    this.articlesFetch(1) // Fetch first page.
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
  
  renderFooter = () => {
    if (this.props.footerIndicator) {
      return <ActivityIndicator size="large" />
    } else {
      return null;
    }
  };
  
  renderView = () => {
    let { articleList } = this.props;
    
    if (articleList.length === 0) articleList = null;
    
    return (
      <FlatList
        data={articleList}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => item.id}
        showsVerticalScrollIndicator={false}
        refreshing={this.props.refreshing}
        onRefresh={this.onRefresh}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={1}
        initialNumToRender={3}
        // https://stackoverflow.com/a/47940952/5285687
        // https://github.com/facebook/react-native/issues/14015
        onMomentumScrollBegin={() => this.onEndReachedCalledDuringMomentum = false}
        ListFooterComponent={this.renderFooter}
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
  const {
    articleList, refreshing, error, page, footerIndicator
  } = state.articleList;
  
  return {
    articleList, refreshing, error, page, footerIndicator
  };
};

export default connect(mapStateToProps, {
  articlesFetch, articleOpen, articleBookmarkOrRemoveBookmark
})(ArticleList);