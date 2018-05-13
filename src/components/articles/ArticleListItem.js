import React, { Component } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { CardView, CardButton, CardSection, HorizontalLineSeparator } from "../common/index";
import {
  BOOKMARK_COLOR,
  TEXT_COLOR_PRIMARY, TEXT_COLOR_SECONDARY, TEXT_SIZE_LARGE, TEXT_SIZE_NORMAL,
  TEXT_SIZE_SMALL
} from "../../styles";
import { articleOpen } from "../../actions";


class ArticleListItem extends Component {
  onPress = () => this.props.articleOpen(this.props.article);
  
  render() {
    const { article } = this.props;
    const {
      imageStyle, titleTextStyle, descriptionTextStyle,
      sourceTextStyle, horizontalLineSeparator
    } = styles;
    
    return (
      <TouchableOpacity
        onPress={this.onPress}
        activeOpacity={0.6}
      >
        <CardView>
          <Image
            style={imageStyle}
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
            text="Add"
            buttonIconType="material"
            buttonIconName="bookmark-border"
            buttonIconColor={BOOKMARK_COLOR}
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
    height: 200,
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

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { articleOpen })(ArticleListItem);