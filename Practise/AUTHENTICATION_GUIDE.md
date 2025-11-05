# Hướng dẫn Authentication cho Mobile Shipping Cart

## Vấn đề và Giải pháp

API `https://nest-api-public.ixe-agent.io.vn/api/v1` yêu cầu authentication để sử dụng. Tôi đã tích hợp hệ thống authentication hoàn chỉnh vào ứng dụng.

## Các tính năng Authentication đã triển khai

### ✅ **API Authentication**
- **Token-based authentication** với Bearer token
- **Automatic token management** với AsyncStorage
- **Request/Response interceptors** để tự động thêm token và xử lý lỗi 401
- **Token persistence** giữa các session

### ✅ **Redux Authentication State**
- **Auth slice** với đầy đủ state management
- **Async thunks** cho login, register, logout
- **Error handling** và loading states
- **Type-safe** với TypeScript

### ✅ **Login/Register Screen**
- **Modern UI** với form validation
- **Demo account** để test nhanh
- **Error handling** với user-friendly messages
- **Loading states** và disabled buttons

### ✅ **AuthGuard Component**
- **Route protection** cho các màn hình cần authentication
- **Automatic token validation** khi app khởi động
- **Redirect to login** khi token invalid
- **Loading screen** trong quá trình check auth

### ✅ **Account Management**
- **User profile** hiển thị thông tin từ API
- **Logout functionality** với confirmation
- **Token cleanup** khi logout

## Cách sử dụng

### 1. **Đăng nhập**
- Mở app, sẽ tự động redirect đến màn hình login
- Nhập email và password
- Hoặc tap "Sử dụng tài khoản demo" để test nhanh

### 2. **Tài khoản Demo**
```
Email: demo@example.com
Password: 123456
```

### 3. **Đăng ký tài khoản mới**
- Tap "Đăng ký ngay" ở cuối màn hình login
- Nhập đầy đủ thông tin: tên, email, password
- Tap "Đăng ký"

### 4. **Đăng xuất**
- Vào tab "Tài khoản"
- Tap nút "Đăng xuất"
- Xác nhận đăng xuất

## API Endpoints được sử dụng

### Authentication
- `POST /auth/login` - Đăng nhập
- `POST /auth/register` - Đăng ký
- `GET /auth/me` - Lấy thông tin user hiện tại

### Products (cần authentication)
- `GET /products` - Lấy danh sách sản phẩm
- `GET /products/{id}` - Lấy chi tiết sản phẩm
- `GET /products/category/{category}` - Lấy sản phẩm theo danh mục
- `GET /products/search?q={query}` - Tìm kiếm sản phẩm
- `GET /products/categories` - Lấy danh mục

## Cấu trúc Authentication

```
services/
├── api.ts                 # Axios config + Auth API calls
store/slices/
├── authSlice.ts          # Redux auth state management
components/
├── AuthGuard.tsx         # Route protection component
app/
├── login.tsx             # Login/Register screen
└── (tabs)/account.tsx    # Account management
```

## Token Management

- **Storage**: AsyncStorage để persist token
- **Headers**: Tự động thêm `Authorization: Bearer {token}`
- **Validation**: Check token validity khi app start
- **Cleanup**: Remove token khi logout hoặc 401 error

## Error Handling

- **401 Unauthorized**: Tự động logout và redirect to login
- **Network errors**: Hiển thị error message cho user
- **Validation errors**: Form validation với real-time feedback
- **Loading states**: Disable buttons và show loading indicators

## Security Features

- **Token persistence**: Secure storage với AsyncStorage
- **Automatic cleanup**: Remove token khi expired
- **Route protection**: AuthGuard bảo vệ các màn hình
- **Error boundaries**: Graceful error handling

## Testing

### Test với tài khoản demo:
1. Mở app
2. Tap "Sử dụng tài khoản demo"
3. Tap "Đăng nhập"
4. Sẽ redirect đến trang chủ và có thể sử dụng tất cả tính năng

### Test đăng ký:
1. Tap "Đăng ký ngay"
2. Nhập thông tin tài khoản mới
3. Tap "Đăng ký"
4. Sẽ tự động đăng nhập và redirect

### Test logout:
1. Vào tab "Tài khoản"
2. Tap "Đăng xuất"
3. Xác nhận
4. Sẽ redirect về màn hình login

## Lưu ý quan trọng

1. **API Base URL**: Đã cấu hình đúng `https://nest-api-public.ixe-agent.io.vn/api/v1`
2. **Token Format**: Sử dụng Bearer token trong Authorization header
3. **Error Handling**: Tự động xử lý 401 errors và logout
4. **Persistence**: Token được lưu và restore giữa các session
5. **Security**: Token được cleanup khi logout hoặc expired

Bây giờ ứng dụng đã sẵn sàng để sử dụng với API có authentication!
