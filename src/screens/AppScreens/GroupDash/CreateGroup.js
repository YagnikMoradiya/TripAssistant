import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import TopbarforAll from "../../../components/TopbarforAll";

const db = firebase.firestore();

const CreateGroupScreen = ({ navigation }) => {
  const [uuid, setuuid] = useState("");

  useEffect(() => setuuid(create_UUID()), []);

  const createGroup = () => {
    db.collection("user")
      .doc(firebase.auth().currentUser.uid)
      .set(
        {
          groupId: uuid,
          adminId: firebase.auth().currentUser.uid,
        },
        { merge: true }
      )
      .then(() => {
        db.collection("group")
          .doc(uuid)
          .set(
            {
              admin: firebase.auth().currentUser.uid,
              member: firebase.firestore.FieldValue.arrayUnion(
                firebase.auth().currentUser.uid
              ),
            },
            { merge: true }
          );
      })
      .then(() => {
        navigation.replace("Dash");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const create_UUID = () => {
    var dt = new Date().getTime();
    var uuid = "xxxxxx".replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  };
  return (
    <>
      <TopbarforAll />
      <View style={styles.container}>
        <Image
          source={require("../../../../assets/invite.png")}
          style={styles.invitelogo}
        />
        <Text style={styles.uuid}>{uuid}</Text>
        <TouchableOpacity
          onPress={() => {
            createGroup();
          }}
          style={styles.signinbtn}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Create</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default CreateGroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -70,
  },
  invitelogo: {
    height: 150,
    width: 150,
    borderColor: "#2B3088",
    borderWidth: 2,
    borderRadius: 100,
  },
  signinbtn: {
    borderWidth: 1,
    borderRadius: 15,
    width: 100,
    height: 38,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  uuid: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
  },
});
