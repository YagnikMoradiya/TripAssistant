import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";
import SigninCom from "../../components/SigninCom";
import Logo from "../../components/Logo";

const SignInScreen = ({ navigation }) => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const SignIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate("Loading");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.backimage}
        backfaceVisibility="visible"
        source={require("../../../assets/background.png")}
      />
      <Logo />
      <SigninCom email={setemail} password={setpassword} />
      <TouchableOpacity
        onPress={() => {
          SignIn(email, password);
        }}
        style={styles.signinbtn}>
        <Text style={{ fontWeight: "bold", color: "#2B3088" }}>Sign-In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignUp");
        }}
        style={styles.signinopt}>
        <Text style={{ fontWeight: "bold", paddingStart: 5, color: "#2B3088" }}>
          Create a new account
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backimage: {
    position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  signinbtn: {
    borderWidth: 1,
    borderRadius: 15,
    width: 80,
    height: 40,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#2B3088",
  },
  signinopt: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 15,
    width: 175,
    height: 40,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#2B3088",
  },
  // forget__text: {
  //   color: "#2B3088",
  // },
});
