import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

const DpPic = ({ takeImage, image }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={takeImage}>
        <Image
          style={styles.dpimg}
          source={image ? { uri: image } : require("../../assets/user.png")}
        />
      </TouchableOpacity>
    </View>
  );
};
export default DpPic;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  dpimg: {
    width: 110,
    height: 110,
    borderRadius: 100,
    borderColor: "#2B3088",
    borderWidth: 2,
  },
});
