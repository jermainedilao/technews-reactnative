import React from "react";
import { Text, View } from "react-native";
import { TEXT_COLOR_SECONDARY, TEXT_SIZE_LARGE } from "../../../../styles";

/**
 * Component for NewsAPI attribution.
 **/
const AttributionListItem = () => {
  const { containerStyle, textStyle } = styles;
  
  return (
    <View style={containerStyle}>
      <Text style={textStyle}>
        Powered by NewsAPI
      </Text>
    </View>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5
  },
  
  textStyle: {
    opacity: 0.8,
    
    fontSize: TEXT_SIZE_LARGE,
    fontStyle: "italic",
    fontWeight: "bold",
    color: TEXT_COLOR_SECONDARY,
  }
};

export default AttributionListItem;