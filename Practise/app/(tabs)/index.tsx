import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppSelector } from "../../store/hooks";

// Dữ liệu fix cứng
const BANNERS = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz4dHcWY64rkXUbh43-5OxxHjetnb6rhTWn-X1_LUl54k_A1nh2Z4_4gTVXQVkCEKUUGw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNimCQr3YssnWmF5z5N4JMgHfmrijmlnz5tTGHJ_4_GMudR4qarFHhKWoAidEHdLap54g&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRni2ktUQi1PLZk57NlLUwrLndAhG70WSEfoK4zt0aNnwFazxVHBEiIvXU1eiu9XAlA-Og&usqp=CAU",
];
const CATEGORIES = [
  { name: "Thời trang", icon: "shirt-outline" },
  { name: "Điện tử", icon: "hardware-chip-outline" },
  { name: "Trang sức", icon: "diamond-outline" },
  { name: "Gia dụng", icon: "home-outline" },
  { name: "Sách", icon: "book-outline" },
];

const { width: screenWidth } = Dimensions.get("window");

// --- Các Component con ---

const HomeHeader = () => {
  const { totalItems } = useAppSelector((state) => state.cart);
  const router = useRouter();

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Chào buổi sáng</Text>
        <Text style={styles.userName}>Quý</Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity onPress={() => router.push("/cart")}>
          <View style={styles.cartIconContainer}>
            <Ionicons name="cart-outline" size={26} color="#333" />
            {totalItems > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  {totalItems > 99 ? "99+" : totalItems}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={26} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SearchBar = () => (
  <View style={styles.searchContainer}>
    <Ionicons name="search-outline" size={22} color="#888" />
    <TextInput placeholder="Tìm kiếm sản phẩm..." style={styles.searchInput} />
  </View>
);

const PromoCarousel = () => (
  <ScrollView
    horizontal
    pagingEnabled
    showsHorizontalScrollIndicator={false}
    style={styles.carouselContainer}
  >
    {BANNERS.map((uri, index) => (
      <Image key={index} source={{ uri }} style={styles.bannerImage} />
    ))}
  </ScrollView>
);

const CategoryList = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Danh mục</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {CATEGORIES.map((category) => (
        <TouchableOpacity key={category.name} style={styles.categoryCard}>
          <View style={styles.categoryIconContainer}>
            <Ionicons name={category.icon as any} size={28} color="#007AFF" />
          </View>
          <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
);

// --- Màn hình chính ---

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeHeader />
        <SearchBar />
        <PromoCarousel />
        <CategoryList />
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// --- StyleSheet ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 16,
    color: "#888",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  cartIconContainer: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "#e53e3e",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  cartBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  // SearchBar
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
    borderRadius: 15,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  // PromoCarousel
  carouselContainer: {
    marginTop: 20,
  },
  bannerImage: {
    width: screenWidth - 40,
    height: 180,
    borderRadius: 20,
    marginHorizontal: 20,
  },
  // Section
  section: {
    marginTop: 30,
    paddingLeft: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  // CategoryList
  categoryCard: {
    alignItems: "center",
    marginRight: 20,
    width: 80,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: "#f0f2f5",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});
