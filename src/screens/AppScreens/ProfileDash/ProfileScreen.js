import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as firebase from "firebase";
import { MyContext } from "../../../../Context";
import TopbarforAll from "../../../components/TopbarforAll";

const ProfileScreen = ({ navigation }) => {
  const userData = useContext(MyContext);

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => navigation.replace("Loading"))
      .catch((error) => error.message);
  };
  return (
    <>
      <TopbarforAll />
      <View style={styles.container}>
        <Image
          style={styles.dp}
          source={
            userData.photoURL
              ? { uri: userData.photoURL }
              : require("../../../../assets/user.png")
          }
        />
        <Text style={styles.name}>{userData.name}</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Contact");
          }}
          style={styles.signinbtn}>
          <Text style={styles.button__font}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            signOut();
          }}
          style={styles.signinbtn}>
          <Text style={styles.button__font}>LogOut</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  signinbtn: {
    borderWidth: 1.5,
    borderRadius: 15,
    borderColor: "#2B3088",
    width: 180,
    height: 40,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  dp: {
    height: 130,
    width: 130,
    borderRadius: 100,
    borderColor: "#2B3088",
    borderWidth: 2,
    marginBottom: 15,
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2B3088",
  },
  button__font: {
    fontSize: 20,
    color: "#2B3088",
    fontWeight: "800",
  },
});
