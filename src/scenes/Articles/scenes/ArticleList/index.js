import React, { PureComponent } from "react";
import { ActivityIndicator, FlatList, StatusBar, Text, View } from "react-native";
import _ from "lodash";
import { connect } from "react-redux";
import HeaderButtons from "react-navigation-header-buttons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ArticleListItem from "../../components/ArticleListItem";
import AttributionListItem from "../../components/AttributionListItem";
import { articleBookmarkOrRemoveBookmark, articleOpen, articlesFetch } from "../../../../data/articles/actions";
import { DEFAULT_HEADER_BUTTON_ICON_SIZE, HEADER_BUTTON_ICON_COLOR } from "../../../../styles";
import { ROUTE_BOOKMARK_LIST } from "../../../../navigators";
import { VIEW_TYPE_ARTICLE, VIEW_TYPE_ATTRIBUTION } from "../../../../constants";

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
    this.state = {
      /**
       * Refreshing state of flat list.
       **/
      refreshing: true,
      /**
       * Decides to show loading indicator in footer.
       **/
      footerIndicator: false
    };
  }
  
  componentWillMount() {
    this.props.navigation.setParams({
      onBookmarkHeaderButtonPress: this.onBookmarkHeaderButtonPress
    });
    this.articlesFetch(1); // Fetch first page.
  }
  
  componentWillReceiveProps(nextProps) {
    const { error, articleList, page } = nextProps;
    
    if (error !== "") {
      console.log(error);
      alert(error);
    }
    
    if (articleList.length > 0) {
      if (page === 1) {
        this.setState({ refreshing: false });
      } else if (page > 0) {
        this.setState({ footerIndicator: false });
      }
    }
  }
  
  onBookmarkHeaderButtonPress = () => this.props.navigation.navigate(ROUTE_BOOKMARK_LIST);
  
  articlesFetch = (page) => {
    if (page > 1) {
      this.setState({ footerIndicator: true })
    }
    
    const debouncedArticlesFetch = _.debounce(this.props.articlesFetch, 200);
    debouncedArticlesFetch(page);
  };
  
  onArticleBookmarkPress = (article) => this.props.articleBookmarkOrRemoveBookmark(article);
  
  onArticlePress = (article) => this.props.articleOpen(article);
  
  onEndReached = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      console.log("onEndReached");
      this.onEndReachedCalledDuringMomentum = true;
      this.articlesFetch(this.props.page + 1); // Fetch next page.
    }
  };
  
  onRefresh = () => {
    this.setState({ refreshing: true });
    this.articlesFetch(1) // Fetch first page.
  };
  
  renderItem = ({ item }) => {
    switch (item.viewType) {
      case VIEW_TYPE_ATTRIBUTION:
        return <AttributionListItem />;
      default:
        return (
          <ArticleListItem
            article={item}
            onBookmarkPress={this.onArticleBookmarkPress}
            onArticlePress={this.onArticlePress}
          />
        );
    }
  };
  
  renderFooter = () => {
    if (this.state.footerIndicator) {
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
        refreshing={this.state.refreshing}
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
    articleList, error, page
  } = state.data.articleList;
  
  return {
    articleList, error, page
  };
};

export default connect(mapStateToProps, {
  articlesFetch, articleOpen, articleBookmarkOrRemoveBookmark
})(ArticleList);