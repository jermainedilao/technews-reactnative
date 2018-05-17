import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { CardButton, CardSection, CardView, HorizontalLineSeparator } from "../common";
import {
  BOOKMARK_COLOR,
  DEFAULT_ARTICLE_IMAGE_HEIGHT,
  TEXT_COLOR_PRIMARY,
  TEXT_COLOR_SECONDARY,
  TEXT_SIZE_LARGE,
  TEXT_SIZE_NORMAL,
  TEXT_SIZE_SMALL
} from "../../styles";

/**
 * Component for each item in article list.
 *
 * @property article Article object to be displayed.
 * @property onBookmarkPress Function to be called when bookmark button is pressed. Receives article as parameter.
 * @property onArticlePress Function to be called when article is pressed. Receives article as parameter.
 **/
class ArticleListItem extends React.PureComponent {
  constructor() {
    super();
    
    this.state = {
      imageHeight: DEFAULT_ARTICLE_IMAGE_HEIGHT
    }
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate");
    console.log(`prevProps: ${prevProps}`);
    console.log(`newProps: ${this.props}`);
    console.log(prevState);
  }
  
  componentWillMount() {
    const { article } = this.props;
    
    Image.getSize(article.urlToImage, (width, height) => {
      // Adjust to original image height if less than the DEFAULT_ARTICLE_IMAGE_HEIGHT.
      if (height < DEFAULT_ARTICLE_IMAGE_HEIGHT) {
        this.setState({
          imageHeight: height
        });
      }
    }, (error) => {
      console.log(error);
    });
  }
  
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
  }
  
  onArticlePress = () => this.props.onArticlePress(this.props.article);
  
  onBookmarkPress = () => this.props.onBookmarkPress(this.props.article);
  
  render() {
    const { article } = this.props;
    const {
      imageStyle, titleTextStyle, descriptionTextStyle,
      sourceTextStyle, horizontalLineSeparator
    } = styles;
    
    return (
      <TouchableOpacity
        onPress={this.onArticlePress}
        activeOpacity={0.6}
      >
        <CardView>
          <Image
            style={[imageStyle, { height: this.state.imageHeight }]}
            resizeMode="cover"
            resizeMethod="scale"
            source={{ uri: article.urlToImage }}
          />
          <CardSection>
            <Text style={titleTextStyle}>
              {article.title}
            </Text>
            <Text style={descriptionTextStyle}>
              {article.description}
            </Text>
            <Text style={sourceTextStyle}>
              {`source: ${article.source.name}`}
            </Text>
          </CardSection>
          
          <HorizontalLineSeparator style={horizontalLineSeparator} />
          
          <CardButton
            text={article.bookmark ? "Remove" : "Add"}
            buttonIconType="material"
            buttonIconName={article.bookmark ? "bookmark" : "bookmark-border"}
            buttonIconColor={BOOKMARK_COLOR}
            onPress={this.onBookmarkPress}
          />
        </CardView>
      </TouchableOpacity>
    );
  }
}

const styles = {
  imageStyle: {
    flex: 1,
    width: null,
    minHeight: 150
  },
  titleTextStyle: {
    fontSize: TEXT_SIZE_LARGE,
    color: TEXT_COLOR_PRIMARY,
    
    marginTop: 4
  },
  descriptionTextStyle: {
    fontSize: TEXT_SIZE_NORMAL,
    color: TEXT_COLOR_SECONDARY,
    
    marginTop: 8
  },
  sourceTextStyle: {
    fontSize: TEXT_SIZE_SMALL,
    fontStyle: "italic",
    color: TEXT_COLOR_SECONDARY,
    opacity: 0.8,
    
    marginTop: 4,
    
    textAlign: "right"
  },
  horizontalLineSeparator: {
    marginLeft: 8,
    marginRight: 8
  }
};

export default ArticleListItem;