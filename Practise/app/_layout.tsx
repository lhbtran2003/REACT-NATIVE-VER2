import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";
import AuthInitializer from "../components/AuthInitializer";
import AuthRedirect from "../components/AuthRedirect";
import { store } from "../store";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

export default function RootLayout() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthInitializer>
          <AuthRedirect>
            <Stack>
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

              {/* Màn hình chi tiết sản phẩm, hiển thị dạng modal */}
              <Stack.Screen
                name="product-detail"
                options={{
                  presentation: "modal",
                  headerShown: false, // Ẩn header mặc định để tự custom
                }}
              />
            </Stack>
          </AuthRedirect>
        </AuthInitializer>
      </QueryClientProvider>
    </Provider>
  );
}
