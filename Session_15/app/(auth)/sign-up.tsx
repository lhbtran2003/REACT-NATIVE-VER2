import { Link, useRouter } from "expo-router";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { register } from "@/apis/auth.apis";
import axios, { HttpStatusCode } from "axios";

export default function SignUpScreen() {
  const router = useRouter();
  const [userRegister, setUserRegister] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    deviceId: "12345",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const matchPassword = () => {
    if (userRegister.password === confirmPassword) return true;
    return false;
  };

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

  const handleRegister = async () => {
    if (matchPassword()) {
      try {
        const res = await register(userRegister);
        router.push("/(auth)/sign-in");
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
              Alert.alert(
                "Cảnh báo ",
                "Đã có lỗi xảy ra. Vui lòng thử lại sau."
              );
              break;
          }
        }
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tạo tài khoản </Text>

      <TextInput
        onChangeText={(value) =>
          setUserRegister({ ...userRegister, firstName: value })
        }
        style={styles.input}
        placeholder="Họ"
      />
      <TextInput
        onChangeText={(value) =>
          setUserRegister({ ...userRegister, lastName: value })
        }
        style={styles.input}
        placeholder="Tên"
      />

      <TextInput
        onChangeText={(value) =>
          setUserRegister({ ...userRegister, email: value })
        }
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        onChangeText={(value) =>
          setUserRegister({ ...userRegister, phoneNumber: value })
        }
        style={styles.input}
        placeholder="Số điện thoại"
        keyboardType="phone-pad"
        autoCapitalize="none"
      />

      <TextInput
        onChangeText={(value) =>
          setUserRegister({ ...userRegister, password: value })
        }
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
      />

      <TextInput
        onChangeText={(value) => setConfirmPassword(value)}
        style={styles.input}
        placeholder="Xác nhận mật khẩu"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>

      <Link href="/(auth)/sign-in" asChild>
        <TouchableOpacity>
          <Text style={styles.linkText}>Đã có tài khoản? Đăng nhập</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "tomato",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    marginTop: 20,
    textAlign: "center",
    color: "tomato",
    fontWeight: "600",
  },
});
