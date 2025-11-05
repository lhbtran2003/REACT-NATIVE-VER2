import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProduct } from "../hooks/useProducts";
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/slices/cartSlice";

export default function ProductDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [selectedSize, setSelectedSize] = useState<string>("");

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useProduct(Number(id));

  const handleAddToCart = () => {
    if (!product) return;
    
    dispatch(addToCart(product));
    Alert.alert(
      "Thành công",
      "Sản phẩm đã được thêm vào giỏ hàng",
      [{ text: "OK" }]
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.headerButton}
          >
            <Ionicons name="chevron-back" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chi tiết sản phẩm</Text>
          <View style={styles.headerButton} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Đang tải thông tin sản phẩm...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError || !product) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.headerButton}
          >
            <Ionicons name="chevron-back" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chi tiết sản phẩm</Text>
          <View style={styles.headerButton} />
        </View>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#e53e3e" />
          <Text style={styles.errorText}>Không thể tải thông tin sản phẩm</Text>
          <Text style={styles.errorSubText}>
            {error?.message || "Vui lòng thử lại sau"}
          </Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={() => router.back()}
          >
            <Text style={styles.retryButtonText}>Quay lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Mock sizes for demonstration
  const sizes = ["S", "M", "L", "XL"];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header tùy chỉnh */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerButton}
        >
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chi tiết sản phẩm</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="share-social-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: product.images[0]?.url || 'https://via.placeholder.com/300' }}
          style={styles.productImage}
        />

        <View style={styles.detailsContainer}>
          {/* Tên và Mã sản phẩm */}
          <Text style={styles.productName}>{product.productName}</Text>
          <Text style={styles.productCode}>Mã sản phẩm: {product.productCode}</Text>

          {/* Category */}
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryLabel}>Danh mục:</Text>
            <Text style={styles.categoryText}>{product.category.categoryName}</Text>
          </View>

          {/* Mô tả */}
          <Text style={styles.description}>{product.description}</Text>

          {/* Chọn Size */}
          <Text style={styles.sectionTitle}>Kích thước</Text>
          <View style={styles.sizeContainer}>
            {sizes.map((size) => (
              <TouchableOpacity 
                key={size} 
                style={[
                  styles.sizeOption,
                  selectedSize === size && styles.sizeOptionSelected
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={[
                  styles.sizeText,
                  selectedSize === size && styles.sizeTextSelected
                ]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.priceLabel}>Giá tiền</Text>
          <Text style={styles.priceValue}>
            {product.priceFull}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Ionicons name="cart-outline" size={24} color="white" />
          <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headerButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: "600" },
  productImage: { width: "100%", height: 300, resizeMode: "contain" },
  detailsContainer: { padding: 20 },
  productName: { fontSize: 24, fontWeight: "bold", color: "#222" },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  productCode: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  categoryText: {
    fontSize: 16,
    color: "#007AFF",
    marginLeft: 8,
    textTransform: "capitalize",
  },
  description: {
    fontSize: 16,
    color: "#4A5568",
    lineHeight: 24,
    marginVertical: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
  sizeContainer: { flexDirection: "row", marginTop: 10 },
  sizeOption: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  sizeOptionSelected: {
    borderColor: "#007AFF",
    backgroundColor: "#007AFF",
  },
  sizeText: { fontSize: 16 },
  sizeTextSelected: {
    color: "white",
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  priceLabel: { fontSize: 16, color: "gray" },
  priceValue: { fontSize: 22, fontWeight: "bold", color: "#e53e3e" },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  addToCartText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e53e3e",
    marginTop: 16,
    textAlign: "center",
  },
  errorSubText: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  retryButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
