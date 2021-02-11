import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Category = ({ name, image }) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.main__icon} />
      <Text style={styles.title}>{name}</Text>
    </View>
  );
};
export default Category;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 5,
  },
  main__icon: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderColor: "#2B3088",
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
  },
});
