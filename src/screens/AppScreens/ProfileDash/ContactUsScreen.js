import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import TopbarforAll from "../../../components/TopbarforAll";

const ContactUsScreen = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <TopbarforAll />
      </View>
      <View style={styles.logo__container}>
        <Image
          source={require("../../../../assets/contactus.png")}
          style={styles.logo}
        />
        <Text style={styles.heading}>Email</Text>
        <Text style={styles.sub__text}>trip.assistant04@gmail.com</Text>
        <Text style={styles.heading}>Creators</Text>
        <Text style={styles.sub__text}>Yagnik Moradiya(19DIT031)</Text>
        <Text style={styles.sub__text}>Dhairya Patel(19DIT036)</Text>
        <Text style={styles.sub__text}>Yash Rudani(19DIT065)</Text>
        <Text style={styles.sub__text}>Akash Zalavadiya(19DIT081)</Text>
      </View>
    </View>
  );
};
export default ContactUsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo__container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 200,
  },
  heading: {
    fontSize: 30,
    color: "#2B3088",
    borderBottomWidth: 2,
    borderBottomColor: "#2B3088",
    margin: 7,
  },
  sub__text: {
    color: "#2B3088",
    fontSize: 20,
  },
});
