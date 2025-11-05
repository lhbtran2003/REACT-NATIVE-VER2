# 🔐 API Authentication Integration - Hướng dẫn

## ✅ **Đã tích hợp API thực tế:**

### 1. **API Endpoints được sử dụng:**
- **Authentication:** `https://nest-api-public.ixe-agent.io.vn/api/v1/auth/login`
- **Products:** `https://nest-api-public.ixe-agent.io.vn/api/v1/products/all`
- **Product Detail:** `https://nest-api-public.ixe-agent.io.vn/api/v1/products/{id}`

### 2. **Fallback Strategy:**
- **API thất bại** → Tự động fallback về mock data
- **Authentication thất bại** → Sử dụng demo account
- **Products API thất bại** → Hiển thị sample products

## 🔧 **Cách hoạt động:**

### **Authentication Flow:**
1. **Login attempt** → Gọi API `/auth/login`
2. **Nếu thành công** → Lưu token và chuyển hướng
3. **Nếu thất bại** → Fallback về demo account (demo@example.com / 123456)

### **Products Flow:**
1. **Load products** → Gọi API `/products/all`
2. **Nếu thành công** → Hiển thị data từ API
3. **Nếu thất bại** → Hiển thị mock products

### **Token Management:**
- **AsyncStorage** để lưu token
- **Axios interceptors** để tự động thêm Bearer token
- **Auto logout** khi token hết hạn

## 🎯 **Để sử dụng API thực tế:**

### **Option 1: Sử dụng demo account**
```
Email: demo@example.com
Password: 123456
```
→ Sẽ tự động fallback về mock authentication

### **Option 2: Tạo account thực tế**
1. **Register** với email/password thực
2. **API sẽ trả về token thực**
3. **Sử dụng token để gọi products API**

### **Option 3: Test với API thực**
1. **Đăng nhập** với credentials hợp lệ
2. **API sẽ trả về token**
3. **Products API sẽ hoạt động với token**

## 🔍 **Debug Information:**

### **Console Logs:**
- `API login failed, using mock authentication` → Fallback auth
- `API getProducts failed, using mock data` → Fallback products
- `API getCurrentUser failed, using mock user` → Fallback user

### **Network Tab:**
- **200 OK** → API thành công
- **401 Unauthorized** → Token không hợp lệ
- **Network Error** → Fallback về mock data

## 🚀 **Test Scenarios:**

### **Scenario 1: API hoạt động**
1. Đăng nhập với account thực
2. API trả về token hợp lệ
3. Products API hoạt động bình thường

### **Scenario 2: API thất bại**
1. Đăng nhập với demo account
2. API fallback về mock authentication
3. Products API fallback về mock data

### **Scenario 3: Token hết hạn**
1. Token cũ trong AsyncStorage
2. API trả về 401 Unauthorized
3. Tự động logout và redirect về login

## 📱 **User Experience:**

- **Seamless fallback** → User không biết API thất bại
- **Consistent UI** → Luôn có data để hiển thị
- **Error handling** → Graceful degradation
- **Loading states** → Better UX

## 🔧 **Cấu hình:**

### **API Base URL:**
```typescript
const API_BASE_URL = 'https://nest-api-public.ixe-agent.io.vn/api/v1';
```

### **Timeout:**
```typescript
timeout: 10000, // 10 seconds
```

### **Retry Policy:**
```typescript
retry: 2, // Retry 2 times before fallback
```

## ✅ **Kết quả:**

- ✅ **API Integration** → Kết nối với API thực tế
- ✅ **Fallback Strategy** → Luôn có data để hiển thị
- ✅ **Token Management** → Tự động quản lý authentication
- ✅ **Error Handling** → Xử lý lỗi gracefully
- ✅ **User Experience** → Smooth và consistent

**Bây giờ app đã sẵn sàng để sử dụng với API thực tế!** 🎉
