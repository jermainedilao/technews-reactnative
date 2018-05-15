import React, { Component } from "react";
import { FlatList, View } from "react-native";
import { connect } from "react-redux";
import { articlesFetch } from "../../actions/index";
import ArticleListItem from "./ArticleListItem";


class ArticleList extends Component {
  constructor() {
    super();
  }
  
  componentWillMount() {
    this.props.articlesFetch();
  }
  
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
    console.log(nextProps);
  }
  
  keyExtractor = (item, index) => `${item.publishedAt}${item.title}`;
  
  renderItem({ item }) {
    return (
      <ArticleListItem
        article={item}
      />
    );
  }
  
  renderView() {
    let { articleList } = this.props;
    
    console.log("renderView");
    
    if (articleList.length === 0) articleList = null;
    
    return (
      <FlatList
        data={articleList}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        showsVerticalScrollIndicator={false}
      />
    );
  }
  
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
  const { articleList } = state;
  
  return articleList;
};

export default connect(mapStateToProps, { articlesFetch })(ArticleList);