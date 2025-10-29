import { login } from "@/apis/auth.apis";
import { UserLogin } from "@/interfaces/auth.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { HttpStatusCode } from "axios";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import uuid from "react-native-uuid";

const ACCESSS_TOKEN = "@access_token";
const REFRESH_TOKEN = "@refresh_token";

// Hàm lưu các thông tin lên AsyncStorage
const saveData = async (accessToken: string, refreshToken: string) => {
  try {
    AsyncStorage.setItem(ACCESSS_TOKEN, accessToken);
    AsyncStorage.setItem(REFRESH_TOKEN, refreshToken);
  } catch (error) {
    console.log("Lỗi khi lưu dữ liệu lên AsyncStorage: ", error);
  }
};

// Hàm lấy dữ liệu từ Storage
const getData = async () => {
  try {
    const accessToken = await AsyncStorage.getItem(ACCESSS_TOKEN);
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN);

    if (!accessToken || !refreshToken) {
      return false;
    }

    return true;
  } catch (error) {
    console.log("Key ACCESSS_TOKEN hoặc REFRESH_TOKEN không tồn tại", error);
    return false;
  }
};

export default function SignInScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userLogin, setUserLogin] = useState<UserLogin>({
    phoneNumber: "",
    password: "",
    deviceId: uuid.v4(),
    isRemembered: true,
  });
  const router = useRouter();

  const getErrorMessage = (errorData: any): string => {
    const rawMessage = errorData?.message;

    if (Array.isArray(rawMessage)) {
      // Nếu là MẢNG (ReadableNativeArray), nối các phần tử lại bằng dấu xuống dòng
      return rawMessage.join("\n");
    }

    if (typeof rawMessage === "string") {
      // Nếu là CHUỖI, trả về chuỗi đó
      return rawMessage;
    }

    // Trường hợp không xác định
    return "Đã có lỗi xảy ra. Vui lòng thử lại sau.";
  };

  const handleLogin = async () => {
    // Hiển thị loading
    setIsLoading(true);
    // Gọi API đăng nhập
    try {
      const response = await login(userLogin);

      // Kiểm tra dữ liệu trả về từ API
      if (response.statusCode === HttpStatusCode.Ok) {
        // Lưu trữ các thông tin quann trọng vào trong AsyncStorage
        saveData(response.data.accessToken, response.data.refreshToken);

        // Chuyển trang về home
        router.push("/(tabs)");

        Alert.alert("Thành công", response.message);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorData = error?.response?.data;
        const errorCode = errorData?.statusCode;
        switch (errorCode) {
          case HttpStatusCode.BadRequest:
            const errorMessage = getErrorMessage(errorData);
            Alert.alert("Cảnh báo ", errorMessage);
            break;

          case HttpStatusCode.TooManyRequests:
            Alert.alert(
              "Cảnh báo ",
              "Thao tác của bạn quá nhanh. Vui lòng thử lại sau 1 phút."
            );

            break;

          default:
            Alert.alert("Cảnh báo ", "Đã có lỗi xảy ra. Vui lòng thử lại sau.");
            break;
        }
      }
    } finally {
      // Tắt loading
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkData = async () => {
      if (await getData()) {
        router.push("/(tabs)");
      }
    };

    checkData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput
        style={styles.input}
        value={userLogin.phoneNumber}
        onChangeText={(text) =>
          setUserLogin({ ...userLogin, phoneNumber: text })
        }
      />
      <TextInput
        style={styles.input}
        value={userLogin.password}
        onChangeText={(text) => setUserLogin({ ...userLogin, password: text })}
        secureTextEntry
      />
      <TouchableOpacity
        disabled={isLoading}
        style={styles.button}
        onPress={() => handleLogin()}
      >
        {isLoading && <ActivityIndicator />}

        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>
      <Link href="/(auth)/sign-up" asChild>
        <TouchableOpacity>
          <Text style={styles.linkText}>Chưa có tài khoản? Đăng ký</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24 },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: "tomato",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
  linkText: { marginTop: 20, textAlign: "center", color: "tomato" },
});
