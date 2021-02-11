import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";

const Topbar = ({ dp }) => (
  <View style={styles.container}>
    <View style={{ flex: 1, justifyContent: "center", paddingLeft: 5 }}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
    </View>
    <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.logoText}>TripAssistant</Text>
    </View>
    <View
      style={{
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        paddingRight: 5,
      }}
    >
      <Image
        style={[
          styles.logo,
          { borderColor: "#2B3088", borderWidth: 1.5, borderRadius: 100 },
        ]}
        source={dp ? { uri: dp } : require("../../assets/user.png")}
      />
    </View>
  </View>
);
export default Topbar;

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
