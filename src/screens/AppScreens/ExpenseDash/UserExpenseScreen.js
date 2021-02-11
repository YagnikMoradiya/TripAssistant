import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";
import TopbarforAll from "../../../components/TopbarforAll";
import ExpenseHistory from "../../../components/ExpenseHistory";

const db = firebase.firestore();

const UserExpenseScreen = (props) => {
  const [userData, setUserData] = useState({});
  const userId = props.route.params.uid;
  const [expense, setExpense] = useState(null);

  let totalAmount = 0;

  if (expense != null) {
    expense.forEach((expense) => {
      if (!expense.isSettleUp) {
        totalAmount = totalAmount + parseFloat(expense.amount);
      }
    });
  }

  useEffect(() => {
    //user's data for profile
    db.collection("user")
      .doc(userId)
      .get()
      .then((snapshot) => {
        setUserData(snapshot.data());
      })
      .then(() => {
        db.collection("user")
          .doc(firebase.auth().currentUser.uid)
          .collection("expense")
          .where("id", "==", userId)
          .onSnapshot((snapshot) => {
            setExpense(snapshot.docs.map((doc) => doc.data()));
          });
      })
      .catch((error) => alert(error.message));
  }, []);

  return (
    <View style={styles.container}>
      <TopbarforAll />
      <View style={styles.user__detail}>
        <Image source={{ uri: userData.photoURL }} style={styles.user__image} />
        <Text style={styles.user__name}>{userData.name}</Text>
        <Text style={styles.user__email}>{userData.email}</Text>
        {totalAmount > 0 ? (
          <Text style={styles.user__total}>
            {userData.name} owes you ₹ {totalAmount.toFixed(2)}
          </Text>
        ) : (
          <Text style={styles.user__total}>
            You owes {userData.name} ₹{totalAmount.toFixed(2)}
          </Text>
        )}
      </View>
      <FlatList
        data={expense}
        keyExtractor={(item) => item.time.toString()}
        renderItem={({ item }) => {
          return <ExpenseHistory item={item} name={userData.name} />;
        }}
      />
      {/* {totalAmount != 0 && (
        <View style={styles.settleup__button}>
          <TouchableOpacity
            onPress={() => {
              settleUp();
            }}
            style={styles.signinbtn}>
            <Text style={{ fontWeight: "bold", color: "#2B3088" }}>
              SETTLE UP
            </Text>
          </TouchableOpacity>
        </View>
      )} */}
    </View>
  );
};
export default UserExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  user__detail: {
    alignItems: "center",
    backgroundColor: "#5f27cd",
    paddingVertical: 20,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  user__image: {
    height: 80,
    width: 80,
    borderRadius: 100,
    marginBottom: 10,
  },
  user__name: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  user__email: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  user__total: {
    fontSize: 14,
    color: "#FFFFFF",
    marginVertical: 2,
  },
  settleup__button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
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
