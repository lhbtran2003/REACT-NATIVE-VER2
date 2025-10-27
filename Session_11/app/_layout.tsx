import { Stack, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import "react-native-reanimated";
import ThemeProvider from "./context/ThemeProvider";
import CartProvider from "./context/CartProvider";

const CartIcon = () => {
  const router = useRouter();

  const goToCart = () => {
    router.push("/CartScreen");
  };

  return (
    <TouchableOpacity onPress={goToCart} style={{ marginRight: 15 }}>
      <Ionicons name="cart-outline" size={26} color="#007AFF" />
    </TouchableOpacity>
  );
};
export default function RootLayout() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Home",
              headerShown: true,
              headerRight: () => <CartIcon />,
            }}
          />
          <Stack.Screen
            name="ProductListScreen"
            options={{
              title: "Product List",
              headerShown: true,
              headerRight: () => <CartIcon />,
            }}
          />
          <Stack.Screen
            name="ProductDetailScreen"
            options={{
              title: "Product Detail",
              headerShown: true,
              headerRight: () => <CartIcon />,
            }}
          />
          <Stack.Screen
            name="CartScreen"
            options={{
              title: "Cart",
              headerShown: true,
            }}
          />
        </Stack>
      </CartProvider>
    </ThemeProvider>
  );
}
