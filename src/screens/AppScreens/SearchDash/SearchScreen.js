import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import TopbarforAll from "../../../components/TopbarforAll";
import Searchbar from "../../../components/Searchbar";
import { Entypo } from "@expo/vector-icons";
import * as firebase from "firebase";

const db = firebase.firestore();

const SearchScreen = ({ navigation }) => {
  const [packages, setPackages] = useState([]);
  const [dummyPackage, setDummyPackage] = useState([]);

  useEffect(() => {
    db.collection("packages").onSnapshot((snapshot) => {
      setPackages(snapshot.docs.map((doc) => doc.data()));
      setDummyPackage(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  const searchPackage = (value) => {
    const filteredPackages = dummyPackage.filter((p) => {
      let packageLowercase = p.name.toLowerCase();
      let searchTermLowercase = value.toLowerCase();
      return packageLowercase.indexOf(searchTermLowercase) > -1;
    });
    setPackages(filteredPackages);
  };

  return (
    <View style={styles.container}>
      <TopbarforAll />
      <Searchbar onChangeText={(value) => searchPackage(value)} />
      <FlatList
        data={packages}
        keyExtractor={(item) => item.url}
        ListEmptyComponent={() => {
          return (
            <View>
              <Text style={{ color: "#2B3088" }}>No Package found</Text>
            </View>
          );
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.main__container}
              onPress={() => {
                navigation.navigate("Place", { item });
              }}>
              <Text style={styles.text}>{item.name}</Text>
              <Text>
                <Entypo name="location-pin" size={16} />
                {item.country}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main__container: {
    paddingVertical: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 5,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 25,
    marginLeft: 5,
  },
  emptyList: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
});
