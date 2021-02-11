import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  YellowBox,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import firebase from "../../../FirebaseConfig";
import SignupCom from "../../components/SignupCom";
import DpPic from "../../components/DpPic";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

const db = firebase.firestore();

const SignUpScreen = ({ navigation }) => {
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [image, setimage] = useState("");
  const [location, setLocation] = useState({});

  useEffect(() => {
    (async () => {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  const saveData = async () => {
    if (image) {
      const imageUrl = await uploadImageAsync(image);
      const detail = {
        name: name,
        email: email,
        phone: phone,
        photoURL: imageUrl,
        latitude: location.latitude,
        longitude: location.longitude,
      };
      db.collection("user").doc(firebase.auth().currentUser.uid).set(detail);
    }
  };

  const SignUp = (email, password, name) => {
    if (image) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase.auth().currentUser.updateProfile({
            displayName: name,
          });
        })
        .then(async () => {
          await saveData();
        })
        .then(() => navigation.replace("Loading"))
        .catch((error) => alert(error.message));
    } else {
      alert("Please select your profile picture");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [1, 1],
      quality: 0.2,
    });

    if (!result.cancelled) {
      setimage(result.uri);
    }
  };

  const uploadImageAsync = async (uri) => {
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
      .child("users")
      .child(firebase.auth().currentUser.uid + "." + fileExtension);
    const snapshot = await ref.put(blob);
    blob.close();
    return await snapshot.ref.getDownloadURL();
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.backimage}
        backfaceVisibility="visible"
        source={require("../../../assets/background.png")}
      />
      <DpPic image={image} takeImage={pickImage} />
      <SignupCom
        name={setname}
        phone={setphone}
        email={setemail}
        password={setpassword}
      />
      <TouchableOpacity
        onPress={() => {
          SignUp(email, password, name, phone, image);
        }}
        style={styles.signinbtn}
      >
        <Text style={{ fontWeight: "bold", color: "#2B3088" }}>Sign-Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("SignIn");
        }}
        style={styles.signinopt}
      >
        <Text style={{ fontWeight: "bold", paddingStart: 5, color: "#2B3088" }}>
          Already have an account
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    width: 190,
    height: 40,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#2B3088",
  },
});
