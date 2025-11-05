import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProducts } from "../../hooks/useProducts";
import { Product } from "../../services/api";
import { useAppDispatch } from "../../store/hooks";
import { addToCart } from "../../store/slices/cartSlice";

type ProductCardProps = {
  item: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };

  const handleProductPress = () => {
    router.push({
      pathname: "/product-detail",
      params: { id: item.id.toString() },
    });
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={handleProductPress}>
        <Image
          source={{ uri: item.images[0]?.url || 'https://via.placeholder.com/150' }}
          style={[styles.image, { backgroundColor: '#f2f2f2' }]}
          resizeMode="cover"
          onError={(e) => {
            console.warn('RN Image load error (list):', item.id, item.images?.[0]?.url, e?.nativeEvent);
          }}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.productName}
        </Text>
        <Text style={styles.price}>
          {item.priceFull}
        </Text>
        <Text style={styles.category}>
          {item.category.categoryName}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddToCart}
      >
        <Ionicons name="add" size={20} color="white" />
        <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function ProductsScreen() {
  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useProducts();

  React.useEffect(() => {
    if (products && products.length > 0) {
      console.log('DBG first product:', products[0]);
      console.log('DBG first image url:', products[0].images?.[0]?.url);
    }
  }, [products]);

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: "Cửa hàng" }} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Đang tải sản phẩm...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: "Cửa hàng" }} />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#e53e3e" />
          <Text style={styles.errorText}>Có lỗi xảy ra khi tải sản phẩm</Text>
          <Text style={styles.errorSubText}>
            {error?.message || "Vui lòng thử lại sau"}
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
            <Text style={styles.retryButtonText}>Thử lại</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Cửa hàng" }} />
      <FlatList
        data={products || []}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          !isLoading ? (
            <View style={styles.emptyContainer}>
              <Ionicons name="cube-outline" size={80} color="#ccc" />
              <Text style={styles.emptyText}>Không có sản phẩm nào</Text>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  listContainer: { padding: 8 },
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 10,
    margin: 8,
    padding: 12,
    alignItems: "flex-start",
    overflow: 'hidden',
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: { width: "100%", aspectRatio: 1, marginBottom: 10 },
  title: { fontSize: 14, fontWeight: "600", textAlign: "center", height: 40 },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e53e3e",
    marginVertical: 8,
  },
  category: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
    textAlign: "center",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  addButtonText: { color: "white", fontWeight: "bold", marginLeft: 4 },
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
  footerLoading: {
    paddingVertical: 20,
    alignItems: "center",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: "#888",
  },
});