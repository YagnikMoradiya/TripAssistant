import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

export default class FirstScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.backimage}
          source={require("../../../assets/firstscreen.png")}
        />
        <View style={styles.topcontainer}>
          <Image source={require("../../../assets/tripAssistant.png")} />
        </View>
        <View style={styles.middlecontainer}>
          <Text style={styles.fline}>NEVER WONDER AGAIN</Text>
          <Text style={styles.sline}>GET OFF TRACK</Text>
          <Text style={styles.tline}>Experience The World Best</Text>
          <Text style={styles.tline}>Adventures With Trip Assistant</Text>
        </View>
        <View style={styles.bottomcontainer}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.replace("SignIn");
            }}
            style={styles.signinopt}
          >
            <Text style={{ fontWeight: "bold", color: "#fff" }}>Sign-In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.replace("SignUp");
            }}
            style={styles.signinopt}
          >
            <Text style={{ fontWeight: "bold", color: "#fff" }}>Sign-Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backimage: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  topcontainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 75,
  },
  middlecontainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  bottomcontainer: {
    flex: 2,
    alignItems: "center",
  },
  signinopt: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#fff",
    width: 175,
    height: 40,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  fline: {
    fontSize: 20,
    color: "#5f27cd",
  },
  sline: {
    fontSize: 40,
    color: "#5f27cd",
  },
  tline: {
    color: "#5f27cd",
  },
});
