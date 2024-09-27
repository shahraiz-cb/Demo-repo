import React from "react";
import { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

const Splash = ({
  navigation
}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("ScreenAI6");
    }, 2000);
  }, []);
  return <View style={styles.container}>
      <Image source={require("./PetboticsLogo.png")} style={styles.logo} />
    </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DFEDF4",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    width: 200,
    height: 287
  }
});
export default Splash;