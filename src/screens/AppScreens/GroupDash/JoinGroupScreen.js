import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import * as firebase from "firebase";
import TopbarforAll from "../../../components/TopbarforAll";

const db = firebase.firestore();
const JoinGroupScreen = ({ navigation }) => {
  const [uuid, setUuid] = useState("");

  const findGroup = async (uuid) => {
    await db
      .collection("group")
      .doc(uuid)
      .update({
        member: firebase.firestore.FieldValue.arrayUnion(
          firebase.auth().currentUser.uid
        ),
      })
      .then(() => {
        db.collection("group")
          .doc(uuid)
          .get()
          .then((snapshot) => {
            saveAdminandGroupId(snapshot.data().admin);
          })
          .catch((error) => alert(error.message));
      })
      .then(() => {
        navigation.replace("Dash");
      })
      .catch((error) => error.message);
  };

  const saveAdminandGroupId = (adminId) => {
    db.collection("user").doc(firebase.auth().currentUser.uid).set(
      {
        adminId: adminId,
        groupId: uuid,
      },
      { merge: true }
    );
  };

  return (
    <>
      <TopbarforAll />
      <View style={styles.container}>
        <Image
          source={require("../../../../assets/invite.png")}
          style={styles.invitelogo}
        />
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.textInput}
          placeholder="Enter Group Code"
          onChangeText={(text) => {
            setUuid(text);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            findGroup(uuid);
          }}
          style={styles.signinbtn}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Join</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default JoinGroupScreen;

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
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    borderWidth: 1,
    height: 40,
    width: "70%",
    paddingStart: 10,
    borderRadius: 5,
    fontSize: 16,
    margin: 20,
    fontSize: 18,
  },
});
