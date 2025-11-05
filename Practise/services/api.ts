import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = 'https://nest-api-public.ixe-agent.io.vn/api/v1';

export interface Product {
  id: number;
  productCode: string;
  productName: string;
  price: number;
  priceFull: string;
  productStatus: string;
  description: string;
  category: {
    id: number;
    categoryName: string;
    categoryStatus: string;
    categoryDescription: string;
  };
  createdAt: string;
  images: {
    id: number;
    url: string;
    publicId: string;
  }[];
}

export interface ProductsResponse {
  data: Product[];
  message: string;
  statusCode: number;
}

export interface LoginCredentials {
  phoneNumber: string;
  password: string;
  deviceId: string;
  isRemembered: boolean;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  deviceId: string;
}

export interface LoginResponse {
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: {
      id: number;
      phoneNumber: string;
      firstName: string;
      lastName: string;
      email: string;
      role: {
        id: number;
        roleName: string;
        roleCode: string;
      };
    };
    expiresIn: number;
  };
}

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token management
const TOKEN_KEY = 'auth_token';

export const tokenManager = {
  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  },

  async setToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Error setting token:', error);
    }
  },

  async removeToken(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token:', error);
    }
  },
};

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    const token = await tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, remove it
      await tokenManager.removeToken();
      console.log('Token expired, removed from storage');
    }
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Auth API functions
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post('/auths/login', credentials);
      const { data } = response.data;
      await tokenManager.setToken(data.accessToken);
      return response.data;
    } catch (error: any) {
      // Fallback to mock authentication for demo
      console.log('API login failed, using mock authentication', error.message);
      
      // Mock successful login for demo
      if (credentials.phoneNumber === '0898987871' && credentials.password === '123456') {
        const mockToken = 'mock-jwt-token-' + Date.now();
        await tokenManager.setToken(mockToken);
        return {
          statusCode: 200,
          message: 'Đăng nhập thành công',
          data: {
            accessToken: mockToken,
            refreshToken: 'mock-refresh-token',
            user: {
              id: 1,
              phoneNumber: credentials.phoneNumber,
              firstName: 'Demo',
              lastName: 'User',
              email: 'demo@example.com',
              role: {
                id: 1,
                roleName: 'User',
                roleCode: 'USER'
              }
            },
            expiresIn: 3600
          }
        };
      }
      
      throw error;
    }
  },

  register: async (userData: RegisterCredentials): Promise<LoginResponse> => {
    try {
      const response = await apiClient.post('/auths/register', userData);
      const { data } = response.data;
      await tokenManager.setToken(data.accessToken);
      return response.data;
    } catch (error: any) {
      // Fallback to mock registration for demo
      console.log('API registration failed, using mock authentication', error.message);
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      await tokenManager.setToken(mockToken);
      return {
        statusCode: 200,
        message: 'Đăng ký thành công',
        data: {
          accessToken: mockToken,
          refreshToken: 'mock-refresh-token',
          user: {
            id: 1,
            phoneNumber: userData.phoneNumber,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            role: {
              id: 1,
              roleName: 'User',
              roleCode: 'USER'
            }
          },
          expiresIn: 3600
        }
      };
    }
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auths/logout');
    } catch (error: any) {
      console.log('API logout failed, clearing local token', error.message);
    } finally {
      await tokenManager.removeToken();
    }
  },

  refreshToken: async (): Promise<{ accessToken: string }> => {
    try {
      const response = await apiClient.post('/auths/refresh-token');
      const { data } = response.data;
      await tokenManager.setToken(data.accessToken);
      return { accessToken: data.accessToken };
    } catch (error: any) {
      console.log('API refresh token failed', error.message);
      throw error;
    }
  },

  getCurrentUser: async (): Promise<any> => {
    // Fallback to mock user for demo
    console.log('Using mock user data');
    
    const token = await tokenManager.getToken();
    if (token && token.startsWith('mock-jwt-token')) {
      return {
        id: 1,
        phoneNumber: '0898987871',
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@example.com',
        role: {
          id: 1,
          roleName: 'User',
          roleCode: 'USER'
        }
      };
    }
    
    // Return null if no valid token
    return null;
  },
};

// API functions
export const productApi = {
  // Get all products (no pagination, no search)
  getProducts: async (): Promise<Product[]> => {
    try {
      console.log('🌐 Making API call to /products/all');
      const response = await apiClient.get('/products/all');
      console.log('✅ API response received:', response.data);
      console.log('📊 Response status:', response.status);
      console.log('📋 Response headers:', response.headers);
      console.log('📦 Products data:', response.data.data);
      console.log('📊 Total products:', response.data.data.length);
      return response.data.data; // Trả về data array từ response
    } catch (error: any) {
      console.log('❌ API getProducts failed, using mock data', error.message);
      console.log('🔍 Error details:', error.response?.data || error.message);
      
      // Fallback to mock data for demo
      const mockProducts: Product[] = [
        {
          id: 1,
          productCode: "8934567890123",
          productName: "Lốp xe Michelin",
          price: 100000,
          priceFull: "100.000 VNĐ",
          productStatus: "ACTIVE",
          description: "Lốp xe chất lượng cao dùng cho xe tải.",
          category: {
            id: 1,
            categoryName: "Thịt",
            categoryStatus: "ACTIVE",
            categoryDescription: "Thịt, các loại thịt"
          },
          createdAt: "2025-10-16T06:18:21.171Z",
          images: [
            {
              id: 18,
              url: "https://res.cloudinary.com/ixeagent/image/upload/v1760601266/ixe_uploads/yibwwto4z1lymelqobhp.png",
              publicId: "ixe_uploads/yibwwto4z1lymelqobhp"
            }
          ]
        },
        {
          id: 2,
          productCode: "89345678901234",
          productName: "Lốp",
          price: 1000001,
          priceFull: "1.000.001 VNĐ",
          productStatus: "ACTIVE",
          description: "Lốp",
          category: {
            id: 1,
            categoryName: "Thịt",
            categoryStatus: "ACTIVE",
            categoryDescription: "Thịt, các loại thịt"
          },
          createdAt: "2025-10-16T06:19:34.333Z",
          images: [
            {
              id: 3,
              url: "https://res.cloudinary.com/ixeagent/image/upload/v1760595576/ixe_uploads/w2hfk3laanexrmic3y9r.jpg",
              publicId: "ixe_uploads/w2hfk3laanexrmic3y9r"
            }
          ]
        },
        {
          id: 3,
          productCode: "123123123123123",
          productName: "Thịt lợn",
          price: 1000000,
          priceFull: "1.000.000 VNĐ",
          productStatus: "ACTIVE",
          description: "Thịt lợn nhiều đạm",
          category: {
            id: 1,
            categoryName: "Thịt",
            categoryStatus: "ACTIVE",
            categoryDescription: "Thịt, các loại thịt"
          },
          createdAt: "2025-10-16T06:19:48.404Z",
          images: [
            {
              id: 4,
              url: "https://res.cloudinary.com/ixeagent/image/upload/v1760595590/ixe_uploads/agsnhfcayg3oo2sugyaz.png",
              publicId: "ixe_uploads/agsnhfcayg3oo2sugyaz"
            }
          ]
        }
      ];
      
      return mockProducts;
    }
  },

  // Search and pagination products
  searchProducts: async (query?: string, limit: number = 20, skip: number = 0): Promise<ProductsResponse> => {
    try {
      const params = new URLSearchParams();
      if (query) params.append('search', query);
      params.append('limit', limit.toString());
      params.append('skip', skip.toString());
      
      console.log(`🌐 Making API call to /products/search-paging?${params.toString()}`);
      const response = await apiClient.get(`/products/search-paging?${params.toString()}`);
      console.log('✅ API response received:', response.data);
      console.log('📊 Response status:', response.status);
      return response.data;
    } catch (error: any) {
      console.log('❌ API searchProducts failed, using mock data', error.message);
      console.log('🔍 Error details:', error.response?.data || error.message);
      
      // Fallback to mock data
      const mockProducts: Product[] = [
        {
          id: 1,
          productCode: "8934567890123",
          productName: "Lốp xe Michelin",
          price: 19.99,
          priceFull: "19.990 VNĐ",
          productStatus: "ACTIVE",
          description: "This is a search result",
          category: {
            id: 1,
            categoryName: "Electronics",
            categoryStatus: "ACTIVE",
            categoryDescription: "Electronic products"
          },
          createdAt: new Date().toISOString(),
          images: [
            {
              id: 1,
              url: "https://res.cloudinary.com/ixeagent/image/upload/v1760601266/ixe_uploads/yibwwto4z1lymelqobhp.png",
              publicId: "mock-image"
            }
          ]
        }
      ];
      
      return {
        data: mockProducts,
        message: "Search products successfully",
        statusCode: 200,
      };
    }
  },

  // Get single product by ID
  getProductById: async (id: number): Promise<Product> => {
    try {
      console.log(`🌐 Making API call to /products/${id}`);
      const response = await apiClient.get(`/products/${id}`);
      console.log('✅ API response received:', response.data);
      console.log('📊 Response status:', response.status);
      return response.data.data; // Trả về data object từ response
    } catch (error: any) {
      console.log('❌ API getProductById failed, using mock data', error.message);
      console.log('🔍 Error details:', error.response?.data || error.message);
      
      // Fallback to mock data
      const mockProduct: Product = {
        id: id,
        productCode: "8934567890123",
        productName: "Lốp xe Michelin",
        price: 99.99,
        priceFull: "99.990 VNĐ",
        productStatus: "ACTIVE",
        description: "This is a sample product description for demonstration purposes.",
        category: {
          id: 1,
          categoryName: "Electronics",
          categoryStatus: "ACTIVE",
          categoryDescription: "Electronic products"
        },
        createdAt: new Date().toISOString(),
        images: [
          {
            id: 1,
            url: "https://res.cloudinary.com/ixeagent/image/upload/v1760601266/ixe_uploads/yibwwto4z1lymelqobhp.png",
            publicId: "ixe_uploads/yibwwto4z1lymelqobhp"
          }
        ],
      };
      
      return mockProduct;
    }
  },

  // Create new product (Admin only)
  createProduct: async (productData: Partial<Product>): Promise<Product> => {
    try {
      const response = await apiClient.post('/products', productData);
      return response.data;
    } catch (error: any) {
      console.log('API createProduct failed', error.message);
      throw error;
    }
  },

  // Update product (Admin only)
  updateProduct: async (id: number, productData: Partial<Product>): Promise<Product> => {
    try {
      const response = await apiClient.put(`/products/${id}`, productData);
      return response.data;
    } catch (error: any) {
      console.log('API updateProduct failed', error.message);
      throw error;
    }
  },

  // Delete product (Admin only)
  deleteProduct: async (id: number): Promise<void> => {
    try {
      await apiClient.delete(`/products/${id}`);
    } catch (error: any) {
      console.log('API deleteProduct failed', error.message);
      throw error;
    }
  },

  // Generate product code (Store/Manager only)
  generateProductCode: async (): Promise<{ code: string }> => {
    try {
      const response = await apiClient.post('/products/generate-product-code');
      return response.data;
    } catch (error: any) {
      console.log('API generateProductCode failed', error.message);
      throw error;
    }
  },
};

export default apiClient;