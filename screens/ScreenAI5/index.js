import React, { useEffect, useState } from "react";
import { Pressable, Alert } from "react-native";
import { StyleSheet } from "react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { api_v1_pet_retrieve } from "../../store/petboticsAPI/pets.slice";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

const RobotPetDetailsScreen = ({
  navigation
}) => {
  const defaultPet = {
    id: 0,
    name: "PetName",
    type: "Loading...",
    isfavorite: false,
    date_adopted: "",
    description: "Loading...",
    attributes: "Loading...",
    userid: "",
    imageUrl: "https://drive.google.com/uc?export=view&id=1xY7Hgd-mvrWujQnw6QOzGxoVJBbDQnU5",
    user: 0
  };
  const dispatch = useDispatch();
  const route = useRoute();
  const [pet, setPet] = useState(defaultPet);
  const api = useSelector(state => state?.Pets.api);
  useEffect(() => {
    if (route?.params?.petId) {
      dispatch(api_v1_pet_retrieve({
        id: route?.params?.petId
      })).then(response => {
        const result = unwrapResult(response);
        setPet(result);
      }).catch(error => Alert.alert("Error: ", error.message));
    }
  }, []);
  if (api.loading === "pending") return <Text>Loading...</Text>;
  return <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.navigate("Pet Gallery")}>
            <Pressable onPress={() => {
            navigation.navigate("petboticsPetgallery");
          }}>
              <Image source={require("./back.png")} style={styles.backButton} />
            </Pressable>
          </TouchableOpacity>
          <Text style={[styles.headerText, styles.bold]}>{pet.name}</Text>
          <View style={styles.headerSpacer} />
        </View>
      </View>
      <View style={styles.content}>
        <Image source={{
        uri: pet.imageUrl
      }} style={styles.petImage} />
        <View style={styles.petDetails}>
          <Text style={[styles.petName, styles.bold, styles.uYBqVxXB]}>
            {pet.name}
          </Text>
          <TouchableOpacity style={styles.anGakhcD}>
            <Image source={{
            uri: pet.isfavorite ? "https://drive.google.com/uc?export=view&id=1tVMtgpqVRu-qrFqEN2u04o_gOPG0vFDQ" : "https://drive.google.com/uc?export=view&id=1pIgKHT8aLxInLdY_XuLrq8P-vzkFizkX"
          }} style={styles.favoriteButton} />
          </TouchableOpacity>
        </View>
        <View style={styles.petAttributes}>
          <View style={styles.attribute}>
            <Text style={styles.attributeLabel}>{"Pet Type"}</Text>
            <Text style={styles.attributeValue}>{pet.type}</Text>
          </View>
          <View style={styles.attribute}>
            <Text style={styles.attributeLabel}>{"Date of Adoption"}</Text>
            <Text style={styles.attributeValue}>{pet.date_adopted}</Text>
          </View>
          <View style={styles.attribute}>
            <Text style={styles.attributeLabel}>{"Description"}</Text>
            <Text style={styles.attributeValue}>{pet.description}</Text>
          </View>
          <View style={styles.attribute}>
            <Text style={styles.attributeLabel}>{"Special Attributes"}</Text>
            <Text style={styles.attributeValue}>{pet.attributes}</Text>
          </View>
        </View>
      </View>
    </View>;
};

export default RobotPetDetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF5F7"
  },
  header: {
    backgroundColor: "#DFEDF4",
    padding: 10
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  backButton: {
    width: 30,
    height: 30
  },
  headerText: {
    color: "#376D89",
    fontSize: 20
  },
  headerSpacer: {
    width: 20
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  petImage: {
    width: "100%",
    height: "50%"
  },
  petDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    width: "100%"
  },
  petName: {
    color: "#376D89",
    fontSize: 18,
    fontWeight: "bold",
    width: 120
  },
  favoriteButton: {
    width: 20,
    height: 20,
    marginVertical: 5
  },
  petAttributes: {
    paddingHorizontal: 20
  },
  attribute: {
    flexDirection: "row",
    paddingVertical: 10
  },
  attributeLabel: {
    color: "#376D89",
    fontWeight: "bold",
    width: 120
  },
  attributeValue: {
    color: "#7D9BAA",
    fontWeight: "bold"
  },
  bold: {
    fontWeight: "bold",
    fontSize: 24
  },
  uYBqVxXB: {
    textAlign: "left"
  },
  anGakhcD: {
    alignSelf: "flex-end"
  }
});