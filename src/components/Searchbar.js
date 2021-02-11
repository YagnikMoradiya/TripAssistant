import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const Searchbar = ({ onChangeText }) => (
  <View style={styles.container}>
    <Feather name="search" style={styles.iconStyle} />
    <TextInput
      style={styles.searchStyle}
      placeholder="Search"
      autoCapitalize="none"
      autoCorrect={false}
      onChangeText={(value) => {
        onChangeText(value);
      }}
    />
  </View>
);
export default Searchbar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#dfe6e9",
    height: 35,
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  iconStyle: {
    fontSize: 25,
    alignSelf: "center",
    marginStart: 10,
  },
  searchStyle: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 18,
  },
});
