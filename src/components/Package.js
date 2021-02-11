import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Card } from "native-base";

const Package = ({ item }) => {
  return (
    <Card style={styles.container}>
      <ImageBackground source={{ uri: item.url }} style={styles.package__main}>
        <View style={styles.package__name}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.location}>
            <Entypo name="location-pin" size={16} />
            {item.country}
          </Text>
        </View>
      </ImageBackground>
    </Card>
  );
};
export default Package;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    marginRight: 5,
  },
  package__main: {
    height: 270,
    width: 300,
    justifyContent: "flex-end",
  },
  package__name: {
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomEndRadius: 10,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 22,
    paddingBottom: 3,
  },
  location: {
    fontSize: 16,
    color: "#FFFFFF",
  },
});
