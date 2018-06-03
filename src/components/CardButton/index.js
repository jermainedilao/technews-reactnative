import React, { Component } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { Icon } from "react-native-elements";
import { CARDVIEW_BACKGROUND_COLOR, TEXT_COLOR_PRIMARY } from "../../styles";

/**
 * Button for card views.
 *
 * @property text Button text.
 * @property buttonIconType React native elements icon type (optional, defaults to "MaterialIcons").
 * @property buttonIconName React native elements icon name.
 * @property buttonIconColor Color of the icon (i.e, #FFFF00).
 * @property onPress Callback function when the button is pressed.
 *
 * @see https://oblador.github.io/react-native-vector-icons/
 **/
class CardButton extends Component {
  onPress = () => this.props.onPress();
  
  render() {
    const { buttonContainerStyle, buttonInnerContainerStyle, buttonTextStyle } = styles;
    
    return (
      <TouchableHighlight
        onPress={this.onPress}
        activeOpacity={0.6}
        style={buttonContainerStyle}
        underlayColor={"#EEEEEE"}
      >
        <View style={buttonInnerContainerStyle}>
          <Icon
            type={this.props.buttonIconType}
            name={this.props.buttonIconName}
            color={this.props.buttonIconColor}
          />
          <View style={{marginLeft: 8}}>
            <Text style={buttonTextStyle}>
              {this.props.text}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = {
  buttonInnerContainerStyle: {
    flexDirection: "row",
    alignItems: "center"
  },
  buttonContainerStyle: {
    backgroundColor: CARDVIEW_BACKGROUND_COLOR,
    paddingTop: 13,
    paddingBottom: 13,
    paddingRight: 16,
    paddingLeft: 16,
    alignSelf: "flex-end"
  },
  buttonTextStyle: {
    fontWeight: "bold",
    color: TEXT_COLOR_PRIMARY
  }
};

export default CardButton;