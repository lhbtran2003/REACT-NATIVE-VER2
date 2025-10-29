export interface UserLogin {
  phoneNumber: string;
  password: string;
  deviceId: string;
  isRemembered: boolean;
}

export interface UserRegister {
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string,
  deviceId: string
}

export interface LoginReponse {
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      firstName: string;
      lastName: string;
      phoneNumber: string;
      email: string;
      status: string;
      dateOfBirth: string;
      address: null;
      gender: string;
      role: {
        id: number;
        roleCode: string;
        roleName: string;
        description: string;
        createdAt: string;
      };
      avatar: string;
    };
  };
  message: "Đăng nhập thành công",
  statusCode: 200;
}

export interface RegisterResponse {
  statusCode: 201,
  message: string,
  data: {
    id: number,
    phoneNumber: string,
    firstName: string,
    lastName: string,
    email: string,
    status: "ACTIVE",
    createdAt: string
  }
}
