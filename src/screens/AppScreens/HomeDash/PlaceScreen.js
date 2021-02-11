import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import TopbarforAll from "../../../components/TopbarforAll";
import { Entypo } from "@expo/vector-icons";

const PlaceScreen = (props) => {
  const item = props.route.params.item;

  return (
    <View style={styles.container}>
      <TopbarforAll />
      <View style={styles.photographs}>
        <ImageBackground source={{ uri: item.url }} style={styles.image}>
          <View style={styles.package__name}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.location}>
              <Entypo name="location-pin" size={16} />
              {item.country}
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.detail}>
        <Text style={styles.descreption__title}>Description</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.book}>
        <Text style={styles.price}>Price: {item.price} ₹</Text>
        <TouchableOpacity
          style={styles.signinbtn}
          onPress={() => {
            Alert.alert(
              "Thank for Booking",
              "We will add payment gateway soon, Sorry for inconvenience.🙏"
            );
          }}>
          <Text style={{ fontWeight: "bold", color: "#2B3088" }}>Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PlaceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photographs: {
    flex: 0.4,
  },
  image: {
    height: "100%",
    width: "100%",
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
  detail: { flex: 0.5 },
  descreption__title: {
    fontSize: 25,
    color: "#2B3088",
    alignSelf: "center",
  },
  description: {
    fontSize: 16,
    alignItems: "flex-start",
  },
  book: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    borderTopWidth: 2,
    borderTopColor: "#2B3088",
  },
  price: {
    fontSize: 20,
    color: "#2B3088",
  },
  signinbtn: {
    borderWidth: 1,
    borderRadius: 15,
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#2B3088",
  },
});
