import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Card } from "native-base";
import * as firebase from "firebase";
import { Entypo } from "@expo/vector-icons";

const db = firebase.firestore();
const UserDetail = ({ uid, navigation }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    db.collection("user")
      .doc(uid)
      .onSnapshot((snapshot) => {
        setUserData(snapshot.data());
      });
  }, []);

  return (
    <View style={styles.main}>
      <Card style={styles.container}>
        <View style={styles.avatar}>
          <Image
            source={
              userData.photoURL
                ? { uri: userData.photoURL }
                : require("../../assets/user.png")
            }
            style={styles.image}
          />
        </View>
        <View style={styles.detail}>
          <Text style={styles.text}>Name: {userData.name}</Text>
          <Text style={styles.text}>Email: {userData.email}</Text>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Map", {
                longitude: userData.longitude,
                latitude: userData.latitude,
              });
            }}>
            <Entypo name="location" size={30} color="#2B3088" />
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};
export default UserDetail;

const styles = StyleSheet.create({
  main: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    height: 75,
    borderRadius: 12,
  },
  avatar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 2,
    borderColor: "#2B3088",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 100,
    borderColor: "#2B3088",
    borderWidth: 1.5,
  },
  detail: {
    flex: 3,
    paddingLeft: 10,
    borderRightWidth: 2,
    borderColor: "#2B3088",
  },
  text: {
    color: "#2B3088",
  },
  button: { flex: 1, justifyContent: "center", alignItems: "center" },
});
