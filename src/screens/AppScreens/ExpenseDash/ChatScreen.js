import React, { useEffect, useState, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase";
import TopbarforAll from "../../../components/TopbarforAll";
import Message from "../../../components/Message";
import { MyContext } from "../../../../Context";
import { FlatList } from "react-native-gesture-handler";
import { log } from "react-native-reanimated";

const db = firebase.firestore();

const ChatScreen = ({ navigation }) => {
  const userData = useContext(MyContext);
  const [message, setMessage] = useState(null);
  const [msg, setMsg] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    db.collection("group")
      .doc(userData.groupId)
      .collection("chat")
      .orderBy("time", "asc")
      .limitToLast(30)
      .onSnapshot((snapshot) =>
        setMessage(snapshot.docs.map((doc) => doc.data()))
      );
  }, []);

  const sendMessage = async (url, name) => {
    if (imageUri && msg) {
      let image = await sendImage(imageUri);
      db.collection("group")
        .doc(userData.groupId)
        .collection("chat")
        .add({
          id: firebase.auth().currentUser.uid,
          message: msg,
          URL: url,
          time: Date.now(),
          name: name,
          imageUri: image,
        })
        .catch((error) => alert(error.message));
      setImageUri(null);
      setMsg("");
    } else if (msg != null && imageUri == null) {
      db.collection("group")
        .doc(userData.groupId)
        .collection("chat")
        .add({
          id: firebase.auth().currentUser.uid,
          message: msg,
          URL: url,
          time: Date.now(),
          name: name,
        })
        .catch((error) => alert(error.message));
      setMsg("");
    } else {
      let image = await sendImage(imageUri);
      db.collection("group")
        .doc(userData.groupId)
        .collection("chat")
        .add({
          id: firebase.auth().currentUser.uid,
          URL: url,
          time: Date.now(),
          name: name,
          imageUri: image,
        })
        .catch((error) => alert(error.message));
      setImageUri(null);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
      quality: 0.2,
    });
    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const sendImage = async (uri) => {
    const parts = uri.split(".");
    const fileExtension = parts[parts.length - 1];

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.error = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed."));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
    const ref = firebase
      .storage()
      .ref()
      .child(userData.groupId)
      .child(uuid.v4() + "." + fileExtension);
    const snapshot = await ref.put(blob);
    blob.close();
    return await snapshot.ref.getDownloadURL();
  };

  // const deleteMessage = (t) => {
  //   Alert.alert("Delete", "Are you sure to delete message", [
  //     {
  //       text: "Cancel",
  //       onPress: () => {
  //         null;
  //       },
  //     },
  //     {
  //       text: "OK",
  //       onPress: () => {
  //         const id = db
  //           .collection("group")
  //           .doc(userData.groupId)
  //           .collection("chat")
  //           .orderBy("time")
  //           .isEqual(t);
  //         console.log(id);

  // .delete()
  // .then(() => {
  //   alert("Message deleted successfully/.");
  // })
  //         // .catch((error) => console.log(error));
  //       },
  //     },
  //   ]);
  // };

  return (
    <View style={styles.container}>
      <TopbarforAll />
      <View style={styles.message__bord}>
        <FlatList
          data={message}
          keyExtractor={(item) => item.time.toString()}
          renderItem={({ item }) => {
            return <Message item={item} id={firebase.auth().currentUser.uid} />;
          }}
        />
      </View>
      <View style={styles.message__box}>
        <TouchableOpacity
          onPress={() => pickImage()}
          style={styles.photo__button}>
          <Ionicons name="md-image" size={35} color="#2B3088" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchStyle}
          placeholder="Type a message"
          autoCapitalize="none"
          autoCorrect={false}
          value={msg}
          onChangeText={(text) => {
            setMsg(text);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            msg || imageUri
              ? sendMessage(userData.photoURL, userData.name)
              : null;
          }}
          style={styles.send__button}>
          <Ionicons name="md-send" size={35} color="#2B3088" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message__bord: {
    flex: 1,
  },
  message__box: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchStyle: {
    flex: 1,
    fontSize: 18,
    borderRadius: 10,
    backgroundColor: "#dfe6e9",
    margin: 10,
    paddingHorizontal: 15,
    height: 35,
  },
  send__button: {
    marginRight: 10,
  },
  photo__button: {
    marginLeft: 10,
  },
});
