import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ShareImage = (props) => (
  <View style={styles.container}>
    <Text>ShareImage</Text>
  </View>
);
export default ShareImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
