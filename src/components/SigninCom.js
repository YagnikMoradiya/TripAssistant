import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Icon } from "native-base";

const SigninCom = ({ email, password }) => (
  <View style={styles.container}>
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
export default SigninCom;

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
    fontSize: 16,
  },
});
