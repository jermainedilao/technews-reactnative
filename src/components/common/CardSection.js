import React from "react";
import { View } from "react-native";

/**
 * Returns a card view section.
 *
 * Should be used when displaying content inside a card view.
 **/
const CardSection = (props) => {
  const { containerStyle } = styles;
  
  return (
    <View style={containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    padding: 8
  }
};

export { CardSection };