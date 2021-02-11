import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Icon } from "native-base";

const SignupCom = ({ name, phone, email, password }) => (
  <View style={styles.container}>
    <View style={styles.Idpass}>
      <Icon name="contact" />
      <TextInput
        autoCapitalize="words"
        style={styles.textInput}
        placeholder="Name"
        onChangeText={(Name) => name(Name)}
      />
    </View>
    <View style={styles.Idpass}>
      <Icon name="ios-call" />
      <TextInput
        autoCapitalize="words"
        style={styles.textInput}
        keyboardType="decimal-pad"
        placeholder="PhoneNumber"
        onChangeText={(phoneNumber) => phone(phoneNumber)}
      />
    </View>
    <View style={styles.Idpass}>
      <Icon name="mail" />
      <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.textInput}
        placeholder="Username or Email"
        onChangeText={(text) => email(text)}
      />
    </View>
    <View style={styles.Idpass}>
      <Icon name="key" />
      <TextInput
        secureTextEntry={true}
        style={styles.textInput}
        placeholder="Password"
        onChangeText={(text) => password(text)}
      />
    </View>
  </View>
);
export default SignupCom;

const styles = StyleSheet.create({
  container: {},
  Idpass: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
  },
  textInput: {
    borderWidth: 1,
    height: 32,
    width: "70%",
    marginLeft: 5,
    paddingStart: 5,
    borderRadius: 5,
  },
});
