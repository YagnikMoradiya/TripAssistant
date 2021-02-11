import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import * as firebase from "firebase";
import * as Location from "expo-location";

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((credential) => {
      if (credential) {
        navigation.replace("Tab");
      } else {
        navigation.replace("Auth");
      }
    });
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2B3088" />
    </View>
  );
};
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
