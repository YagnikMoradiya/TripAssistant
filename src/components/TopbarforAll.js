import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";

const TopbarforAll = ({ dp }) => (
  <View style={styles.container}>
    <View style={{ flex: 1, justifyContent: "center", paddingLeft: 5 }}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
    </View>
    <View style={{ alignItems: "center", flex: 2 }}>
      <Text style={styles.logoText}>TripAssistant</Text>
    </View>
    <View style={{ flex: 1 }}></View>
  </View>
);
export default TopbarforAll;

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: Dimensions.get("window").width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    marginTop: StatusBar.currentHeight,
  },
  logoText: {
    color: "#2B3088",
    fontSize: 22,
  },
  logo: {
    height: 30,
    width: 30,
  },
});
