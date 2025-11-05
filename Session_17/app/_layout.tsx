import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 phút
      refetchOnWindowFocus: false, // có thể được ghi đè ở 1 useQuery khác
      retry: 2 // tự động thử lại 2 lần nếu thất bại (chỉ là optional), mặc định là 3 lần
    },
    mutations: {
      onError: (error) => {
        console.log("Đã có lỗi xảy ra khi cố gắng thực hiện mutation: ", error.message);
        
      }
    }
  }
}); // có thể tạo cấu hình toàn cục

export default function RootLayout() {
  

  return (
    <QueryClientProvider client={queryClient}>
      <Redirect href={"/Home"} />
      <Stack>
        <Stack.Screen name="Home" options={{ headerShown: true }} />
        <Stack.Screen name="(inClass)" options={{ headerShown: false }} />
        <Stack.Screen name="(homeworks)" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
