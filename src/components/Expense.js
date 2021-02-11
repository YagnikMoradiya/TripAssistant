import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import * as firebase from "firebase";

const db = firebase.firestore();

const Expense = ({ uid, amount }) => {
  const [userData, setUserData] = useState({});
  const a = amount;

  useEffect(() => {
    db.collection("user")
      .doc(uid)
      .onSnapshot((snapshot) => {
        setUserData(snapshot.data());
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.user__container}>
        <Image
          style={styles.user__dp}
          source={
            userData.photoURL
              ? { uri: userData.photoURL }
              : require("../../assets/user.png")
          }
        />
        <Text>{userData.name}</Text>
      </View>
      <Text style={styles.amount__negative}>{amount}</Text>
    </View>
  );
};
export default Expense;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    borderRadius: 10,
    marginHorizontal: 10,
    flexDirection: "row",
  },
  user__container: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  user__dp: {
    width: 50,
    height: 50,
    borderRadius: 100,
    margin: 10,
    alignSelf: "flex-start",
  },
  amount__negative: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "red",
  },
});
