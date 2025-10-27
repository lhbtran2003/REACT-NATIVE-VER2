import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type ProductType = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export default function ProductListScreen() {
  const router = useRouter();

  const productList: ProductType[] = [
    {
      id: 1,
      name: "áo choàng",
      description: "ấm",
      price: 150,
    },
    {
      id: 2,
      name: "Áo khoác",
      description: "đẹp",
      price: 200,
    },
    {
      id: 3,
      name: "Quần jean",
      description: "bền",
      price: 300,
    },
    {
      id: 4,
      name: "Mũ len",
      description: "mềm",
      price: 100,
    },
  ];

  const goToProductDetailScreen = (product: ProductType) => {
    router.push({ pathname: "./ProductDetailScreen", params: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price
    } });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Products</Text>
      <FlatList
        columnWrapperStyle={styles.list}
        numColumns={2}
        data={productList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => goToProductDetailScreen(item)}
          >
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIDJwT58UWZTsmxsEJalrL_ASrD4qyyo2rOg&s",
              }}
              style={styles.image}
            />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <TouchableOpacity style={styles.customeButton}>
              <Text style={styles.buttonText}>Add to cart</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  header:{
    fontSize: 30,
    fontWeight: "bold"
  },
  list: {
    justifyContent: "space-between"
    
  },
  card: {
    marginHorizontal: 20,
    marginVertical: 20,
    display: "flex",
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    backgroundColor: "lightgrey",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 20
  },
  price: {
    color: "red",
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
  }
});
