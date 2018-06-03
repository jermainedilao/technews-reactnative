import React from "react";
import { View } from "react-native";
import { CARDVIEW_BACKGROUND_COLOR } from "../../styles";

/**
 * Returns a card view component.
 **/
const CardView = (props) => {
  const { containerStyle } = styles;
  
  return (
    <View style={containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#DDDDDD",
    borderBottomWidth: 0,
    
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowColor: "#000000",
    shadowRadius: 2,
    
    elevation: 1,
    
    marginTop: 5,
    marginBottom: 5,
    
    backgroundColor: CARDVIEW_BACKGROUND_COLOR,
    justifyContent: "flex-start",
    flexDirection: "column"
  }
};

export default CardView;