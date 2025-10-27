import { useLocalSearchParams } from "expo-router";
import React, { useContext } from "react";

import { ProductType } from "./ProductListScreen";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CartContext } from "./context/CartProvider";

export default function ProductDetailScreen() {
  const { id, name, description, price } = useLocalSearchParams();

  const {addToCart} = useContext(CartContext)

  const handleAddToCart = () => {
    addToCart({productId: Number(id), quantity: 1})
  }
  return (
    <View>
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIDJwT58UWZTsmxsEJalrL_ASrD4qyyo2rOg&s",
        }}
        style={styles.image}
      />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{price}</Text>
        <Text style={styles.description}>{description}</Text>
        <TouchableOpacity style={styles.customeButton} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "30%",
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
  },
  description: {
    fontSize: 20,
  },
  customeButton: {
    backgroundColor: "lightblue",
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
});
