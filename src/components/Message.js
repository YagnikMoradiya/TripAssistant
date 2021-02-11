import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Card } from "native-base";

const Message = ({ item, id }) => {
  return (
    <View style={id === item.id ? styles.container : styles.container__reverse}>
      <Card
        style={
          id === item.id
            ? styles.message__container
            : styles.message__container__reverse
        }>
        <Text
          style={
            id === item.id ? styles.name__text : styles.name__text__reverse
          }>
          {item.name}
        </Text>
        {item.imageUri != null && (
          <Image
            source={{ uri: item.imageUri }}
            style={styles.message__image}
          />
        )}
        <Text
          style={
            id === item.id
              ? styles.message__text
              : styles.message__text__reverse
          }>
          {item.message}
        </Text>
        <Text style={styles.time__text}>
          {new Date(item.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </Card>
      <Image
        style={id === item.id ? styles.dp : styles.dp__reverse}
        source={item.URL ? { uri: item.URL } : require("../../assets/user.png")}
      />
    </View>
  );
};
export default Message;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    margin: 5,
    alignItems: "center",
  },
  container__reverse: {
    flexDirection: "row-reverse",
    justifyContent: "flex-end",
    margin: 10,
    alignItems: "center",
  },
  message__container: {
    padding: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#5f27cd",
  },
  message__container__reverse: {
    padding: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  name__text: {
    alignSelf: "flex-end",
    fontWeight: "bold",
    fontSize: 12,
    paddingBottom: 5,
    color: "#FFFFFF",
  },
  name__text__reverse: {
    fontWeight: "bold",
    fontSize: 12,
    paddingBottom: 5,
  },
  message__image: {
    height: 200,
    width: 200,
  },
  message__text: {
    alignSelf: "flex-end",
    color: "#FFFFFF",
    fontSize: 16,
  },
  message__text__reverse: {
    fontSize: 16,
  },
  time__text: {
    color: "#95a5a6",
    fontSize: 10,
    alignSelf: "flex-end",
    paddingTop: 5,
  },
  dp: {
    height: 40,
    width: 40,
    borderRadius: 100,
    borderColor: "#2B3088",
    borderWidth: 1.5,
    marginLeft: 5,
  },
  dp__reverse: {
    height: 40,
    width: 40,
    borderRadius: 100,
    borderColor: "#2B3088",
    borderWidth: 1.5,
    marginRight: 5,
  },
});
