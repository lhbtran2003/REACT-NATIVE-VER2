import { LoginReponse, RegisterResponse, UserLogin, UserRegister } from "@/interfaces/auth.interface";
import axios from "axios";

// Hàm gọi API đăng nhập
export const login = async (userLogin: UserLogin): Promise<LoginReponse> => {
  const response = await axios.post<LoginReponse>(
    "https://nest-api-public.ixe-agent.io.vn/api/v1/auths/login",
    userLogin
  );

  return response.data;
};

// Hàm gọi API đăng kí
export const register = async(userRegister: UserRegister): Promise<RegisterResponse> => {
  const response = await axios.post(
    "https://nest-api-public.ixe-agent.io.vn/api/v1/auths/register",
     userRegister
  )
  return response.data
}