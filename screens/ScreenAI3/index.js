import React from "react";
import { Pressable, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import axios from "axios";

const CreatePetScreen = ({
  navigation,
  authToken
}) => {
  const {
    entities: user
  } = useSelector(state => state.user || {});
  const [petName, setPetName] = useState("Rob");
  const [petType, setPetType] = useState("Petbot");
  const [dateOfAdoption, setDateOfAdoption] = useState("2023-04-05");
  const [description, setDescription] = useState("");
  const [specialAttributes, setSpecialAttributes] = useState("");
  const [petCreated, setPetCreated] = useState(false);
  const [imageUrl, setImageUrl] = useState("https://drive.google.com/uc?export=view&id=139XGK7ODE8e_MdcY6bHiBJes8xOqlV-L");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    if (user) {
      if (!user.id) setUserId(user.id);
    }
  }, [user]);

  const handleCreatePet = () => {
    const pet = {
      name: petName,
      type: petType,
      isfavorite: true,
      date_adopted: dateOfAdoption,
      description: description,
      attributes: specialAttributes,
      userid: "string",
      imageUrl: imageUrl,
      user: userId
    };
    axios.post("https://petbotics-40848.botics.co/api/v1/pet/", pet, {
      headers: {
        Authorization: `Token ${authToken}`
      }
    }).then(() => {
      setPetCreated(true);
      setTimeout(() => {
        setPetCreated(false);
        navigation.navigate("petboticsPetgallery");
      }, 2000);
    }).catch(error => {
      console.log(error);
    });
  };

  const handleChangePhoto = () => {
    console.log("Change Photo");
  };

  return <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => {
        navigation.navigate("petboticsPetgallery");
      }}>
          <Image source={require("./back.png")} style={styles.closeButton} />
        </Pressable>
        <Text style={styles.headerTitle}>Create</Text>
        <View style={styles.sccXJTVR} />
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <TouchableOpacity onPress={handleChangePhoto}>
          <View style={styles.petImageContainer}>
            <Image source={{
            uri: imageUrl
          }} style={styles.petImage} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleChangePhoto} style={styles.changePhotoButton}>
          <Text style={styles.changePhotoButtonText}>Change Photo</Text>
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Pet Name</Text>
          <TextInput style={styles.input} placeholder="Enter pet name" value={petName} onChangeText={setPetName} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Pet Type</Text>
          <TextInput style={styles.input} placeholder="Enter pet type" value={petType} onChangeText={setPetType} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Date of Adoption</Text>
          <TextInput style={styles.input} placeholder="Enter date of adoption" value={dateOfAdoption} onChangeText={setDateOfAdoption} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <TextInput style={[styles.input, styles.multilineInput]} placeholder="Enter pet description" value={description} onChangeText={setDescription} multiline />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Special Attributes</Text>
          <TextInput style={[styles.input, styles.multilineInput]} placeholder="Enter special attributes" value={specialAttributes} onChangeText={setSpecialAttributes} multiline />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput style={styles.input} placeholder="Enter image URL" value={imageUrl} onChangeText={setImageUrl} />
        </View>
        <Pressable style={styles.createButton} onPress={handleCreatePet}>
          <Text style={styles.createButtonText}>
            {petCreated ? "Pet Created" : "Create Profile"}
          </Text>
        </Pressable>
      </ScrollView>
    </View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF5F7"
  },
  header: {
    backgroundColor: "#DFEDF4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  headerTitle: {
    color: "#376D89",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1
  },
  closeButton: {
    width: 30,
    height: 30
  },
  body: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    padding: 10
  },
  petImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20
  },
  petImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  changePhotoButton: {
    backgroundColor: "#376D89",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 150,
    marginBottom: 20
  },
  changePhotoButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 10
  },
  label: {
    color: "#376D89",
    marginBottom: 5
  },
  input: {
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    borderRadius: 5,
    color: "#376D89",
    textAlign: "left"
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top"
  },
  createButton: {
    backgroundColor: "#376D89",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center"
  },
  createButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  sccXJTVR: {
    width: 30
  }
});
export default CreatePetScreen;