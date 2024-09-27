import { useDispatch } from "react-redux";
import { api_v1_login_create } from "../../store/petboticsAPI/authTokens.slice.js";
import { Pressable } from "react-native";
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { unwrapResult } from "@reduxjs/toolkit";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const onSubmit = async () => {
    try {
      dispatch(api_v1_login_create({
        data: {
          username,
          password
        }
      })).then(response => {
        const result = unwrapResult(response);
        navigation.navigate("petboticsPetgallery", result);
      }).catch(error => Alert.alert(error.message));
    } catch (error) {
      Alert.alert("Error", error);
      console.error(error);
    }
  };

  return <View style={styles.container}>
      <View style={styles.body}>
        <Image source={require("./PetboticsLogo.png")} style={styles.logo} />
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput style={styles.input} placeholder="Enter your username" placeholderTextColor="#BDBDBD" value={username} onChangeText={setUsername} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry={true} placeholderTextColor="#BDBDBD" value={password} onChangeText={setPassword} />
        </View>
        <Pressable style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DFEDF4"
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 150,
    height: 230,
    marginBottom: 50
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20
  },
  label: {
    fontFamily: "Lato",
    fontSize: 16,
    color: "#376D89",
    marginBottom: 5
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#376D89",
    borderRadius: 10,
    padding: 10,
    fontFamily: "Lato",
    fontSize: 16,
    color: "#376D89"
  },
  button: {
    backgroundColor: "#376D89",
    borderRadius: 10,
    padding: 10,
    marginTop: 20
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Lato",
    fontSize: 16,
    textAlign: "center"
  }
});
export default LoginScreen;