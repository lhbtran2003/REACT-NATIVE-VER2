import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { CartContext } from "./context/CartProvider";

export default function CartScreen() {
 const { cart, deleteProductInCart } = useContext(CartContext);


  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIDJwT58UWZTsmxsEJalrL_ASrD4qyyo2rOg&s",
        }}
        style={styles.image}
      />
      <View style={styles.info}>
        <Text style={styles.name}>Sản phẩm #{item.productId}</Text>
        <Text style={styles.price}>Số lượng: {item.quantity}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteProductInCart(item.productId)}>
        <Text style={{ color: "red" }}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🛒 Giỏ hàng</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.productId.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <View style={styles.footer}>
        <Text style={styles.totalLabel}>Tổng cộng:</Text>
        <Text style={styles.totalValue}>1.207.000₫</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    padding: 16,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    elevation: 2,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  price: {
    marginTop: 4,
    color: "#666",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalLabel: {
    fontSize: 16,
    color: "#555",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "700",
  },
  checkoutButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "700",
  },
});
