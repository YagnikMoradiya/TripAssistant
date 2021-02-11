import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";

const ExpenseHistory = ({ item, name }) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon__container}>
        <Entypo
          name="info-with-circle"
          size={40}
          color="#2B3088"
          style={styles.icon}
        />
      </View>
      <View style={styles.descreption__container}>
        <Text style={styles.expense__descreption}>{item.descreption}</Text>
        {item.amount > 0 ? (
          <Text style={styles.lightword}>You paid ₹{item.amount}</Text>
        ) : (
          <Text style={styles.lightword}>
            {name} ₹{item.amount}
          </Text>
        )}
      </View>
      <View style={styles.amount__container}>
        <Text
          style={
            item.amount < 0 ? styles.amount__negative : styles.amount__positive
          }>
          ₹{item.amount}
        </Text>
      </View>
    </View>
  );
};
export default ExpenseHistory;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 20,
    margin: 5,
    alignItems: "center",
    height: 50,
    borderBottomWidth: 1,
  },
  icon__container: {
    flex: 0.16,
  },
  icon: {},
  descreption__container: {
    flex: 0.6,
  },
  expense__descreption: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lightword: {
    fontSize: 12,
    fontWeight: "100",
    color: "#636e72",
  },
  amount__negative: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ee5253",
  },
  amount__container: {
    flex: 0.4,
    alignItems: "flex-end",
  },
  amount__positive: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#10ac84",
  },
});
