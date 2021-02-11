import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import TopbarforAll from "../../../components/TopbarforAll";
import { FontAwesome } from "@expo/vector-icons";
import { FlatList, TextInput } from "react-native-gesture-handler";
import * as firebase from "firebase";
import { MyContext } from "../../../../Context";
import Member from "../../../components/Member";

const db = firebase.firestore();

const AddExpenseScreen = (props) => {
  const [descreption, setDescreption] = useState("");
  const [amount, setAmount] = useState(null);
  const [member, setMember] = useState([]);
  const userData = useContext(MyContext);
  const expenseGroupMember = new Array();

  const newArray = (id) => {
    expenseGroupMember.push(id);
    console.log(expenseGroupMember);
  };

  useEffect(() => {
    db.collection("group")
      .doc(userData.groupId)
      .get()
      .then((snapshot) => {
        setMember(snapshot.data().member);
      })
      .catch((error) => alert(error.message));
  }, []);

  const addExpense = () => {
    if (amount != null && expenseGroupMember.length != 0) {
      const ref = db
        .collection("user")
        .doc(firebase.auth().currentUser.uid)
        .collection("expense");

      expenseGroupMember.map((id) => {
        ref
          .add({
            id: id,
            amount: (amount / (expenseGroupMember.length + 1)).toFixed(2),
            descreption,
            isSettleUp: false,
            time: Date.now(),
          })
          .then(() => {
            db.collection("user")
              .doc(id)
              .collection("expense")
              .add({
                id: firebase.auth().currentUser.uid,
                amount: -(amount / (expenseGroupMember.length + 1)).toFixed(2),
                descreption,
                isSettleUp: false,
                time: Date.now(),
              });
          })
          .then(() => alert("Expense added successfully."))
          .catch((error) => alert(error.message));
      });
    } else {
      alert("All the field is required.");
    }
    setAmount(null);
    setDescreption("");
  };

  return (
    <View style={styles.container}>
      <TopbarforAll />
      <View style={styles.input__detail}>
        <View style={styles.input}>
          <FontAwesome name="list-alt" size={20} />
          <TextInput
            keyboardType="default"
            style={styles.textInput}
            placeholder="Descreption"
            value={descreption}
            onChangeText={(d) => setDescreption(d)}
          />
        </View>
        <View style={styles.input}>
          <FontAwesome name="rupee" size={20} style={{ padding: 5 }} />
          <TextInput
            keyboardType="decimal-pad"
            style={[styles.textInput]}
            placeholder="Amount"
            value={amount}
            onChangeText={(a) => setAmount(a)}
          />
        </View>
      </View>
      <FlatList
        data={member}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          if (item != firebase.auth().currentUser.uid) {
            return (
              <TouchableOpacity
                onPress={() => {
                  newArray(item);
                }}>
                <Member item={item} />
              </TouchableOpacity>
            );
          }
        }}
      />
      <View style={styles.add__button}>
        <TouchableOpacity
          onPress={(item) => {
            addExpense(item);
          }}
          style={styles.signinbtn}>
          <Text style={{ fontWeight: "bold", color: "#2B3088" }}>Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AddExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input__detail: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  textInput: {
    borderWidth: 1,
    height: 32,
    width: "70%",
    marginLeft: 10,
    paddingStart: 5,
    borderRadius: 5,
  },
  add__button: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  signinbtn: {
    borderWidth: 1,
    borderRadius: 15,
    width: 80,
    height: 40,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#2B3088",
  },
});
