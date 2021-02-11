import React, { useContext, useEffect, useState } from "react";
import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import * as firebase from "firebase";
import { Accuracy, getCurrentPositionAsync } from "expo-location";
import Topbar from "../../../components/Topbar";
import { MyContext } from "../../../../Context";
import Category from "../../../components/Category";
import Package from "../../../components/Package";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

const db = firebase.firestore();
const HomeScreen = ({ navigation }) => {
  const userData = useContext(MyContext);
  const [packages, setPackages] = useState(null);

  const watchLocation = async () => {
    let location = await getCurrentPositionAsync({
      accuracy: Accuracy.Balanced,
    });
    updateLocation(location.coords);
  };

  useEffect(() => {
    watchLocation();
    recievePackage();
  }, []);

  const updateLocation = ({ latitude, longitude }) => {
    db.collection("user").doc(firebase.auth().currentUser.uid).set(
      {
        latitude: latitude,
        longitude: longitude,
      },
      { merge: true }
    );
  };

  const recievePackage = () => {
    db.collection("packages").onSnapshot((snapshot) =>
      setPackages(snapshot.docs.map((doc) => doc.data()))
    );
  };

  if (!userData.photoURL) {
    return (
      <ActivityIndicator
        size="large"
        color="#2B3088"
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      />
    );
  }
  return (
    <>
      <Topbar dp={userData.photoURL} />
      <View style={styles.helloContainer}>
        <Text style={styles.line1}>Hello {userData.name}</Text>
        <Text style={styles.line2}>Enjoy The World's Best Trips</Text>
      </View>
      <View style={styles.categories}>
        <Text
          style={{
            color: "#2B3088",
            fontSize: 30,
            borderBottomWidth: 3,
            borderBottomColor: "#2b3088",
            marginRight: 218,
          }}>
          Categories
        </Text>
        <View style={styles.categories__icon}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Category", { type: "Beach" });
            }}>
            <Category
              name="Beach"
              image={require("../../../../assets/beach.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Category", { type: "Mountain" });
            }}>
            <Category
              name="Mountain"
              image={require("../../../../assets/mountain.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Category", { type: "Nature" });
            }}>
            <Category
              name="Nature"
              image={require("../../../../assets/skyscappers.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.packages}>
        <Text
          style={{
            color: "#2B3088",
            fontSize: 30,
            borderBottomWidth: 3,
            borderBottomColor: "#2b3088",
            marginRight: 230,
          }}>
          Packages
        </Text>
        <View style={{ marginTop: 7 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={packages}
            keyExtractor={(item) => item.url}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Place", {
                      item,
                    });
                  }}>
                  <Package item={item} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  helloContainer: {
    paddingLeft: 10,
    margin: 15,
  },
  line1: {
    fontSize: 30,
    color: "#2B3088",
    fontWeight: "bold",
    marginBottom: 7,
  },
  line2: {
    color: "#6C63FF",
    fontSize: 18,
  },
  categories: {
    paddingLeft: 10,
    paddingVertical: 15,
  },
  categories__icon: {
    flexDirection: "row",
    marginTop: 7,
  },
  packages: {
    paddingLeft: 10,
  },
});
