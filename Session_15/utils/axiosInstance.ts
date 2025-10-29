import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {
  AxiosError,
  AxiosInstance,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from "axios";
import { Alert } from "react-native";

let isLoggingOut = false;

const logoutWithMessageOnce = () => {
  if (isLoggingOut) return;
  isLoggingOut = true;

  Alert.alert(
    "Session Expired",
    "Your session has expired. Please log in again.",
    [
      {
        text: "OK",
        onPress: async () => {
          await AsyncStorage.removeItem("@access_token");
          await AsyncStorage.removeItem("@refresh_token");
          // Logic to navigate to login screen
        },
      },
    ],
    { cancelable: false }
  );

  setTimeout(() => {
    isLoggingOut = false;
  }, 5000);
};

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  __http_retry?: boolean;
}

class Http {
  instance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: {
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
  }[] = [];

  constructor() {
    const apiBaseUrl = "https://nest-api-public.ixe-agent.io.vn/api/v1/";

    this.instance = axios.create({
      baseURL: apiBaseUrl,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request Interceptor
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const accessToken = await AsyncStorage.getItem("@access_token");
        if (accessToken && config) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error: AxiosError) => {
        console.error("Request Error:", error);
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        // Lỗi 401 và chưa retry
        const RETRY_KEY = "__http_retry";
        if (
          error.response?.status === HttpStatusCode.Unauthorized &&
          originalRequest &&
          !originalRequest[RETRY_KEY] &&
          (await AsyncStorage.getItem("@refresh_token")) &&
          originalRequest.url !== "auths/refresh-token" // Không retry nếu đang refresh
        ) {
          originalRequest[RETRY_KEY] = true;

          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then((token: unknown) => {
                originalRequest.headers.Authorization = `Bearer ${
                  token as string
                }`;
                return this.instance(originalRequest);
              })
              .catch((err) => Promise.reject(err));
          }

          this.isRefreshing = true;

          try {
            const refreshToken = await AsyncStorage.getItem("@refresh_token");

            const res = await axios.post(
              `https://nest-api-public.ixe-agent.io.vn/api/v1/auths/refresh-token`,
              { refreshToken }
            );

            const newAccessToken = res.data?.data?.accessToken;

            if (!newAccessToken) {
              console.error("❌ No access token in response:", res.data);
              throw new Error("No access token in refresh response");
            }

            await AsyncStorage.setItem("@access_token", newAccessToken);

            this.failedQueue.forEach((prom) => prom.resolve(newAccessToken));
            this.failedQueue = [];

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return this.instance(originalRequest);
          } catch (refreshError) {
            console.error("❌ Token refresh failed:", refreshError);
            this.failedQueue.forEach((prom) => prom.reject(refreshError));
            this.failedQueue = [];

            // Xử lý lỗi refresh token và logout
            logoutWithMessageOnce();

            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        // Xử lý các lỗi khác (ví dụ: lỗi mạng, lỗi máy chủ, timeout, v.v.)
        if (error.code === "ECONNABORTED") {
          Alert.alert(
            "Network Error",
            "The request timed out. Please try again."
          );
        } else if (
          error.response?.status === HttpStatusCode.InternalServerError
        ) {
          Alert.alert(
            "Server Error",
            "The server encountered an error. Please try again later."
          );
        } else if (error.response?.status === HttpStatusCode.BadRequest) {
          Alert.alert(
            "Bad Request",
            "The request was invalid. Please check your input."
          );
        } else {
          Alert.alert(
            "Error",
            "An unexpected error occurred. Please try again."
          );
        }

        console.error("Response Error:", error);

        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;
