import React, { Component } from "react";
import { Text, View } from "react-native";


class BookmarkList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Bookmarks"
    };
  };
  
  render() {
    return (
      <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>
          Hello BookmarkList!
        </Text>
      </View>
    );
  }
}

export default BookmarkList;