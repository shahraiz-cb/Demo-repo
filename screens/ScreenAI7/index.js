import { useSelector, useDispatch } from "react-redux";
import { rest_auth_user_update } from "../../store/petboticsAPI/userDetails.slice.js";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Pressable, TextInput } from "react-native";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const UserProfileScreen = () => {
  const {
    entities: user
  } = useSelector(state => state?.user || {});
  const [email, setEmail] = useState(user?.email);
  const [password, setPassword] = useState(user?.password);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    if (user && user?.email) {
      if (!user.email) setEmail(user.email);
      if (!user.password) setPassword(user.password);
    }
  }, [user]);

  const onSubmit = () => {
    dispatch(rest_auth_user_update({
      email,
      password
    })).then(() => {
      navigation.navigate("petboticsPetgallery");
    }).catch(error => {
      console.error("Error during update:", error);
    });
  };

  return <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Pressable onPress={() => {
          navigation.navigate("petboticsPetgallery");
        }}>
            <Image source={require("./back.png")} style={styles.backButtonImage} />
          </Pressable>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Profile</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.label}>Username (Email Address)</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} secureTextEntry value={password} onChangeText={setPassword} />
        <TouchableOpacity style={styles.resetButton}>
          <Text style={styles.resetButtonText}>Reset Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton}>
          <Pressable onPress={onSubmit}>
            <Text style={styles.saveButtonText}>Save</Text>
          </Pressable>
        </TouchableOpacity>
      </View>
    </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF5F7"
  },
  header: {
    backgroundColor: "#DFEDF4",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  backButton: {
    position: "absolute",
    left: 10
  },
  backButtonImage: {
    width: 30,
    height: 30
  },
  headerTitle: {
    color: "#376D89",
    fontSize: 24,
    fontFamily: "Lato",
    fontWeight: "700"
  },
  body: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-start"
  },
  label: {
    color: "#376D89",
    fontSize: 16,
    fontFamily: "Lato",
    marginBottom: 5
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontFamily: "Lato"
  },
  resetButton: {
    alignSelf: "flex-end",
    marginBottom: 10
  },
  resetButtonText: {
    color: "#376D89",
    fontSize: 16,
    fontFamily: "Lato",
    textDecorationLine: "underline"
  },
  saveButton: {
    backgroundColor: "#376D89",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 10
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Lato",
    fontWeight: "bold"
  }
});
export default UserProfileScreen;