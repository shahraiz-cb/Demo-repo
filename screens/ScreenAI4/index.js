import React from "react";
import { useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Pressable } from "react-native";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { api_v1_pet_list } from "../../store/petboticsAPI/pets.slice.js";
import { unwrapResult } from "@reduxjs/toolkit";
const dummyPetData = [{
  id: 1,
  name: "Buddy",
  imageUrl: "https://drive.google.com/uc?export=view&id=139XGK7ODE8e_MdcY6bHiBJes8xOqlV-L",
  isfavorite: false
}, {
  id: 2,
  name: "Max",
  imageUrl: "https://drive.google.com/uc?export=view&id=1lr1eFggIYYMbaXCOKVFI-Z-Zn8Z7Fnhi",
  isfavorite: true
}, {
  id: 3,
  name: "Charlie",
  imageUrl: "https://drive.google.com/uc?export=view&id=1H6aB3CncDrYuLwPx0DBlNp0saLLRrNcp",
  isfavorite: false
}, {
  id: 4,
  name: "Lucy",
  imageUrl: "https://drive.google.com/uc?export=view&id=1xY7Hgd-mvrWujQnw6QOzGxoVJBbDQnU5",
  isfavorite: true
}, {
  id: 5,
  name: "Daisy",
  imageUrl: "https://drive.google.com/uc?export=view&id=139XGK7ODE8e_MdcY6bHiBJes8xOqlV-L",
  isfavorite: false
}, {
  id: 6,
  name: "Rocky",
  imageUrl: "https://drive.google.com/uc?export=view&id=1xY7Hgd-mvrWujQnw6QOzGxoVJBbDQnU5",
  isfavorite: false
}, {
  id: 7,
  name: "Luna",
  imageUrl: "https://drive.google.com/uc?export=view&id=1lr1eFggIYYMbaXCOKVFI-Z-Zn8Z7Fnhi",
  isfavorite: true
}, {
  id: 8,
  name: "Bailey",
  imageUrl: "https://drive.google.com/uc?export=view&id=1H6aB3CncDrYuLwPx0DBlNp0saLLRrNcp",
  isfavorite: false
}, {
  id: 9,
  name: "Sadie",
  imageUrl: "https://drive.google.com/uc?export=view&id=1xY7Hgd-mvrWujQnw6QOzGxoVJBbDQnU5",
  isfavorite: false
}, {
  id: 10,
  name: "Molly",
  imageUrl: "https://drive.google.com/uc?export=view&id=1H6aB3CncDrYuLwPx0DBlNp0saLLRrNcp",
  isfavorite: true
}];

const PetGalleryScreen = () => {
  const {
    api,
    entities: storePets
  } = useSelector(state => state?.Pets);
  console.log(storePets);
  const {
    entities: authUser
  } = useSelector(state => state?.AuthTokens);
  const [pets, setPets] = useState(storePets);
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const [filter, setFilter] = useState("Explore");
  useEffect(() => {
    // if user is authenticated, fetch pets
    if ((authUser || route.params.token) && !pets.length) {
      // check user info
      console.log(authUser);
      dispatch(api_v1_pet_list()).then(response => {
        const result = unwrapResult(response);
        setPets(result);
      }).catch(error => Alert.alert(error.message));
    } else {// logoff, navigate to the login screen?
    }
  }, [authUser, route?.params?.token]);

  const handleFilter = filterType => {
    setFilter(filterType);

    if (filterType === "Explore") {
      setPets(storePets);
    } else if (filterType === "My Pets") {
      setPets(storePets.filter(pet => !pet.isfavorite));
    } else if (filterType === "My Favs") {
      setPets(storePets.filter(pet => pet.isfavorite));
    }
  };

  const handleFavToggle = id => {
    const updatedPets = pets.map(pet => {
      if (pet.id === id) {
        return { ...pet,
          isFav: !pet.isfavorite
        };
      }

      return pet;
    });
    setPets(updatedPets);
  };

  return <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => {
        navigation.navigate("ScreenAI7", {});
      }}>
          <Image source={require("./peticon.png")} style={styles.headerImage} />
        </Pressable>
        <Text style={styles.headerTitle}>{"Explore"}</Text>
        <Pressable onPress={() => {
        navigation.navigate("ScreenAI3", {
          token: route?.params?.token
        });
      }}>
          <Image source={require("./add.png")} style={styles.headerImage} />
        </Pressable>
      </View>
      <View style={styles.body}>
        {api?.loading === "pending" && <Text>Loading...</Text>}
        <ScrollView contentContainerStyle={styles.cardContainer}>
          {pets.map(pet => <Pressable key={pet.id} style={styles.card} onPress={() => {
          navigation.navigate("ScreenAI5", {
            petId: pet.id
          });
        }}>
              <Image source={{
            uri: pet.imageUrl
          }} style={styles.cardImage} />
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardName}>{pet.name}</Text>
                <TouchableOpacity onPress={() => handleFavToggle(pet.id)}>
                  <Image source={{
                uri: pet.isfavorite ? "https://drive.google.com/uc?export=view&id=1tVMtgpqVRu-qrFqEN2u04o_gOPG0vFDQ" : "https://drive.google.com/uc?export=view&id=1pIgKHT8aLxInLdY_XuLrq8P-vzkFizkX"
              }} style={styles.cardFavImage} />
                </TouchableOpacity>
              </View>
            </Pressable>)}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.footerButton, filter === "Explore" && styles.footerButtonHighlighted]} onPress={() => handleFilter("Explore")}>
          <Image source={require("./1200px-Magnifying_glass_icon.svg.png")} style={styles.footerButtonImage} />
          <Text style={[styles.footerButtonText, {
          color: filter === "Explore" ? "#FFFFFF" : "#376D89"
        }]}>
            Explore
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.footerButton, filter === "My Pets" && styles.footerButtonHighlighted]} onPress={() => handleFilter("My Pets")}>
          <Image source={require("./peticon.png")} style={styles.footerButtonImage} />
          <Text style={[styles.footerButtonText, {
          color: filter === "My Pets" ? "#FFFFFF" : "#376D89"
        }]}>
            My Pets
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.footerButton, filter === "My Favs" && styles.footerButtonHighlighted]} onPress={() => handleFilter("My Favs")}>
          <Image source={{
          uri: "https://drive.google.com/uc?export=view&id=1pIgKHT8aLxInLdY_XuLrq8P-vzkFizkX"
        }} style={styles.footerButtonImage} />
          <Text style={[styles.footerButtonText, {
          color: filter === "My Favs" ? "#FFFFFF" : "#376D89"
        }]}>
            My Favs
          </Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10
  },
  headerTitle: {
    color: "#376D89",
    fontSize: 24,
    fontWeight: "bold"
  },
  headerImage: {
    width: 30,
    height: 30
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 20
  },
  cardImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  cardTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  cardName: {
    color: "#376D89",
    fontSize: 18,
    fontWeight: "bold"
  },
  cardFavImage: {
    width: 34,
    height: 31
  },
  footer: {
    backgroundColor: "#DFEDF4",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  footerButton: {
    flexDirection: "column",
    alignItems: "center"
  },
  footerButtonHighlighted: {
    backgroundColor: "#376D89",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  footerButtonImage: {
    width: 34,
    height: 31
  },
  footerButtonText: {
    color: "#376D89",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5
  }
});
export default PetGalleryScreen;