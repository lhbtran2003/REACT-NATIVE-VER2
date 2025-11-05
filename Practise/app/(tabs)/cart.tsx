import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearCart, removeFromCart, updateQuantity } from "../../store/slices/cartSlice";

type CartItemProps = { 
  item: {
    id: number;
    productCode: string;
    productName: string;
    price: number;
    priceFull: string;
    productStatus: string;
    description: string;
    category: {
      id: number;
      categoryName: string;
      categoryStatus: string;
      categoryDescription: string;
    };
    createdAt: string;
    images: {
      id: number;
      url: string;
      publicId: string;
    }[];
    quantity: number;
  };
};

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleIncreaseQuantity = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      Alert.alert(
        "Xóa sản phẩm",
        "Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?",
        [
          { text: "Hủy", style: "cancel" },
          { 
            text: "Xóa", 
            style: "destructive",
            onPress: () => dispatch(removeFromCart(item.id))
          }
        ]
      );
    }
  };

  const handleRemoveItem = () => {
    Alert.alert(
      "Xóa sản phẩm",
      "Bạn có muốn xóa sản phẩm này khỏi giỏ hàng?",
      [
        { text: "Hủy", style: "cancel" },
        { 
          text: "Xóa", 
          style: "destructive",
          onPress: () => dispatch(removeFromCart(item.id))
        }
      ]
    );
  };

  return (
    <View style={styles.itemContainer}>
      <Image
        source={{ uri: item.images[0]?.url || 'https://via.placeholder.com/100' }}
        style={styles.itemImage}
        resizeMode="contain"
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>
          {item.productName}
        </Text>
        <Text style={styles.itemPrice}>
          {item.priceFull}
        </Text>
        <Text style={styles.itemCode}>Mã: {item.productCode}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={handleDecreaseQuantity}>
            <Ionicons name="remove-circle-outline" size={28} color="#555" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={handleIncreaseQuantity}>
            <Ionicons name="add-circle-outline" size={28} color="#555" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={handleRemoveItem}>
        <Ionicons name="trash-outline" size={24} color="#e53e3e" />
      </TouchableOpacity>
    </View>
  );
};

const CartSummary = () => {
  const { items, totalPrice } = useAppSelector((state) => state.cart);
  const [shippingFee, setShippingFee] = useState("0");

  const calculateTotal = () => {
    const shipping = parseFloat(shippingFee) || 0;
    return totalPrice + shipping;
  };

  return (
    <View style={styles.summaryContainer}>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Tạm tính</Text>
        <Text style={styles.summaryValue}>
          ${totalPrice.toFixed(2)}
        </Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>Phí vận chuyển</Text>
        <TextInput 
          keyboardType="numeric" 
          style={styles.textInput}
          value={shippingFee}
          onChangeText={setShippingFee}
          placeholder="0"
        />
      </View>
      <View style={styles.separator} />
      <View style={styles.summaryRow}>
        <Text style={styles.totalLabel}>Tổng cộng</Text>
        <Text style={styles.totalValue}>
          ${calculateTotal().toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

export default function CartScreen() {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleClearCart = () => {
    if (items.length === 0) return;
    
    Alert.alert(
      "Xóa tất cả",
      "Bạn có muốn xóa tất cả sản phẩm khỏi giỏ hàng?",
      [
        { text: "Hủy", style: "cancel" },
        { 
          text: "Xóa tất cả", 
          style: "destructive",
          onPress: () => dispatch(clearCart())
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: "Giỏ hàng của bạn",
          headerRight: () => (
            items.length > 0 ? (
              <TouchableOpacity onPress={handleClearCart}>
                <Ionicons name="trash-outline" size={24} color="#e53e3e" />
              </TouchableOpacity>
            ) : null
          )
        }} 
      />
      <FlatList
        data={items}
        renderItem={({ item }) => <CartItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={<CartSummary />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={80} color="#ccc" />
            <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống</Text>
            <Text style={styles.emptySubText}>
              Hãy thêm một số sản phẩm để bắt đầu mua sắm!
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  // CartItem styles
  itemContainer: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  itemImage: { width: 80, height: 80, borderRadius: 8 },
  itemDetails: { flex: 1, marginLeft: 15, justifyContent: "space-between" },
  itemName: { fontSize: 16, fontWeight: "600" },
  itemPrice: { fontSize: 16, fontWeight: "bold", color: "#e53e3e" },
  itemCode: { fontSize: 12, color: "#666", marginTop: 2 },
  quantityContainer: { flexDirection: "row", alignItems: "center" },
  quantityText: { fontSize: 18, fontWeight: "bold", marginHorizontal: 15 },
  // Summary styles
  summaryContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    backgroundColor: "#fafafa",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  summaryLabel: { fontSize: 16, color: "#666" },
  summaryValue: { fontSize: 16, fontWeight: "500" },
  separator: { height: 1, backgroundColor: "#e0e0e0", marginVertical: 10 },
  totalLabel: { fontSize: 18, fontWeight: "bold" },
  totalValue: { fontSize: 18, fontWeight: "bold", color: "#e53e3e" },
  // Empty state styles
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  emptyText: { marginTop: 10, fontSize: 16, color: "#888" },
  emptySubText: { 
    marginTop: 5, 
    fontSize: 14, 
    color: "#aaa",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: 150,
    height: 32,
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: "#333",
  },
});
