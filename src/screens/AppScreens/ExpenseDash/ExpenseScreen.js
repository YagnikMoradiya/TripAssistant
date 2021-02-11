import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import TopbarforAll from "../../../components/TopbarforAll";
import { MaterialIcons } from "@expo/vector-icons";
import Expense from "../../../components/Expense";
import * as firebase from "firebase";
import { MyContext } from "../../../../Context";
import { FlatList } from "react-native-gesture-handler";

const db = firebase.firestore();

const ExpenseScreen = ({ navigation }) => {
  const [groupMember, setGroupMember] = useState([]);
  const userData = useContext(MyContext);

  useEffect(() => {
    if (userData.groupId) {
      db.collection("group")
        .doc(userData.groupId)
        .onSnapshot((snapshot) => {
          setGroupMember(snapshot.data().member);
        });
    }
  }, []);

  if (userData.groupId) {
    return (
      <View style={styles.container}>
        <TopbarforAll />
        <View style={styles.group}>
          <Text style={styles.group__text}>Group</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Chat");
            }}>
            <MaterialIcons
              name="message"
              size={25}
              color="#2B3088"
              style={styles.message__icon}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={groupMember}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              if (item != firebase.auth().currentUser.uid) {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("UserExpense", { uid: item });
                    }}>
                    <Expense uid={item} navigation={navigation} />
                  </TouchableOpacity>
                );
              }
            }}
          />
        </View>
        <View style={styles.expense__button}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AddExpense");
            }}
            style={styles.signinopt}>
            <Text
              style={{
                fontWeight: "bold",
                paddingStart: 5,
                color: "#2B3088",
                fontSize: 20,
              }}>
              Add Expense
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <TopbarforAll />
        <View style={styles.else__container}>
          <Text style={styles.else__text}>Please join or create a group.</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("GroupDash", { screen: "Group" });
            }}
            style={styles.signinopt}>
            <Text
              style={{ fontWeight: "bold", paddingStart: 5, color: "#2B3088" }}>
              Create Or Join Group
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};
export default ExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  group: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    borderBottomColor: "#2B3088",
    borderBottomWidth: 2,
    paddingBottom: 15,
    alignItems: "center",
  },
  group__text: {
    color: "#2B3088",
    fontSize: 30,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  message__icon: {
    paddingRight: 20,
  },
  expense__button: {
    justifyContent: "center",
    alignItems: "center",
  },
  signinopt: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 15,
    width: 190,
    height: 40,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#2B3088",
  },
  else__container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  else__text: {
    fontSize: 20,
    color: "#2B3088",
  },
});
