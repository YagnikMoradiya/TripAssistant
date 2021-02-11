import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Logo = (props) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logoimage}
        source={require("../../assets/logo.png")}
      />
      <Text style={styles.text}>Let's Travel</Text>
    </View>
  );
};
export default Logo;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 35,
    alignItems: "center",
  },
  logoimage: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 25,
    marginTop: 5,
    fontStyle: "italic",
  },
});
