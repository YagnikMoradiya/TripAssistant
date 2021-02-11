import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { MyContext } from "../../../../Context";
import TopbarforAll from "../../../components/TopbarforAll";

const GroupScreen = ({ navigation }) => {
  const userData = useContext(MyContext);

  if (userData.groupId) {
    navigation.replace("Dash");
  }
  return (
    <View style={styles.container}>
      <TopbarforAll />
      <View style={styles.grouplogoContainer}>
        <Image
          style={styles.grouplogo}
          source={require("../../../../assets/Group.png")}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Create");
          }}
          style={styles.signinbtn}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Create</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Join");
          }}
          style={styles.signinbtn}
        >
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default GroupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  grouplogoContainer: {
    flex: 1,
    marginTop: -70,
    alignItems: "center",
    justifyContent: "center",
  },
  grouplogo: {
    height: 150,
    width: 150,
  },
  signinbtn: {
    borderWidth: 1,
    borderRadius: 15,
    width: 120,
    height: 40,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
