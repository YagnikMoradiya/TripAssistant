import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import { MyContext } from "../../../../Context";
import TopbarforAll from "../../../components/TopbarforAll";
import UserDetail from "../../../components/UserDetail";
import { TouchableOpacity } from "react-native-gesture-handler";

const db = firebase.firestore();

const GroupDashScreen = ({ navigation }) => {
  const [adminData, setAdminData] = useState({});
  const [member, setMember] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userData = useContext(MyContext);

  useEffect(() => {
    admin();
    memberData();
  }, []);

  const admin = async () => {
    await db
      .collection("user")
      .doc(userData.adminId)
      .get()
      .then((snapshot) => {
        setAdminData(snapshot.data());
      })
      .catch((error) => alert(error.message));
  };

  const memberData = async () => {
    await db
      .collection("group")
      .doc(userData.groupId)
      .get()
      .then((snapshot) => {
        setMember(snapshot.data().member);
        setIsLoading(false);
      })
      .catch((error) => error.message);
  };

  const leaveGroup = () => {
    db.collection("group")
      .doc(userData.groupId)
      .update({
        member: firebase.firestore.FieldValue.arrayRemove(
          firebase.auth().currentUser.uid
        ),
      })
      .then(() => {
        db.collection("user")
          .doc(firebase.auth().currentUser.uid)
          .update({
            groupId: firebase.firestore.FieldValue.delete(),
          })
          .then(() => navigation.replace("Group"))
          .catch((error) => alert(error.message));
      })
      .catch((error) => alert(error.message));
  };

  if (isLoading) {
    return (
      <ActivityIndicator style={styles.loading} size="large" color="#2B3088" />
    );
  }
  return (
    <>
      <TopbarforAll />
      <View style={styles.container}>
        <View style={styles.adminContainer}>
          <Text style={styles.admin}>ADMIN</Text>
          <Image source={{ uri: adminData.photoURL }} style={styles.dp} />
          <Text style={styles.name}>Group Id: {adminData.groupId}</Text>
          <Text style={styles.name}>Name: {adminData.name}</Text>
        </View>
      </View>
      <FlatList
        data={member}
        renderItem={({ item }) => {
          return <UserDetail uid={item} navigation={navigation} />;
        }}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.exit__button}>
        <TouchableOpacity
          onPress={() => {
            leaveGroup();
          }}>
          <Ionicons name="md-exit" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </>
  );
};
export default GroupDashScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 12,
  },
  adminContainer: {
    width: "100%",
    height: 150,
    alignItems: "center",
  },
  admin: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2B3088",
  },
  dp: {
    height: 80,
    width: 80,
    borderColor: "#2B3088",
    borderWidth: 2,
    borderRadius: 100,
    margin: 5,
  },
  name: {
    color: "#2B3088",
    fontWeight: "bold",
    fontSize: 15,
  },
  loading: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  signinopt: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 15,
    width: 180,
    height: 40,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#2B3088",
  },
  leave__button: {
    justifyContent: "center",
    alignItems: "center",
  },
  exit__button: {
    borderRadius: 100,
    backgroundColor: "#2B3088",
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 10,
    bottom: 10,
  },
  chat__button: {
    borderRadius: 100,
    backgroundColor: "#2B3088",
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 10,
    bottom: 10,
  },
});
