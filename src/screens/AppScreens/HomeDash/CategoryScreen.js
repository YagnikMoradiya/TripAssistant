import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Package from "../../../components/Package";
import TopbarforAll from "../../../components/TopbarforAll";
import * as firebase from "firebase";

const db = firebase.firestore();

const CategoryScreen = ({ route, navigation }) => {
  const type = route.params.type;
  const [packages, setPackages] = useState(null);

  useEffect(() => {
    (async () => {
      db.collection("packages")
        .where("category", "==", type)
        .onSnapshot((snapshot) => {
          setPackages(snapshot.docs.map((doc) => doc.data()));
        });
    })();
  }, []);

  return (
    <>
      <TopbarforAll />
      <FlatList
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
    </>
  );
};
export default CategoryScreen;

const styles = StyleSheet.create({});
