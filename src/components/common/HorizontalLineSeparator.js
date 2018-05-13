import React from "react";
import { View } from "react-native";

/**
 * Returns a horizontal line.
 **/
const HorizontalLineSeparator = ({ style }) => {
  let { lineStyle } = styles;
  
  return (
    <View style={[lineStyle, style]} />
  );
};

const styles = {
  lineStyle: {
    flex: 1,
    height: 1,
    backgroundColor: "#DDDDDD"
  }
};

export { HorizontalLineSeparator };