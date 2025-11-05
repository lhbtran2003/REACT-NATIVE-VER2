# Mobile Shipping Cart Template

Ứng dụng shopping cart mobile được xây dựng với React Native, Expo Router, Redux Toolkit, TanStack Query và Axios.

## Tính năng đã triển khai

### ✅ API Integration
- **API Base URL**: `https://nest-api-public.ixe-agent.io.vn/api/v1`
- **Sử dụng Axios** để tương tác với API
- **TanStack Query** để quản lý server state hiệu quả
- **Caching và retry** tự động

### ✅ State Management
- **Redux Toolkit** để quản lý state toàn cục
- **Cart slice** với các actions: addToCart, removeFromCart, updateQuantity, clearCart
- **Type-safe** với TypeScript

### ✅ Chức năng sản phẩm
- **Lấy danh sách sản phẩm** từ API
- **Hiển thị sản phẩm** với hình ảnh, tên, giá, rating
- **Pull-to-refresh** và **infinite scroll**
- **Loading states** và **error handling**

### ✅ Chi tiết sản phẩm
- **Xem thông tin chi tiết** sản phẩm
- **Chọn kích thước** (S, M, L, XL)
- **Thêm vào giỏ hàng** với thông báo
- **Navigation** với params

### ✅ Giỏ hàng
- **Thêm sản phẩm** vào giỏ hàng
- **Cập nhật số lượng** sản phẩm
- **Xóa sản phẩm** riêng lẻ
- **Xóa tất cả** sản phẩm
- **Tính tổng tiền** tự động
- **Phí vận chuyển** có thể nhập
- **Badge hiển thị** số lượng sản phẩm

### ✅ UI/UX
- **Responsive design** cho mobile
- **Loading indicators** và **error states**
- **Empty states** với hướng dẫn
- **Confirmation dialogs** cho các hành động quan trọng
- **Modern UI** với Material Design

## Cấu trúc dự án

```
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation
│   │   ├── index.tsx      # Home screen
│   │   ├── products.tsx   # Products list
│   │   └── cart.tsx       # Shopping cart
│   ├── product-detail.tsx # Product detail modal
│   └── _layout.tsx        # Root layout with providers
├── store/                 # Redux store
│   ├── index.ts          # Store configuration
│   ├── hooks.ts          # Typed hooks
│   └── slices/
│       └── cartSlice.ts  # Cart state management
├── services/             # API services
│   └── api.ts           # Axios configuration & API calls
├── hooks/                # Custom hooks
│   └── useProducts.ts   # TanStack Query hooks
└── assets/              # Static assets
```

## Cài đặt và chạy

1. **Cài đặt dependencies**:
```bash
npm install
```

2. **Chạy ứng dụng**:
```bash
npm start
```

3. **Chạy trên thiết bị**:
```bash
npm run android  # Android
npm run ios      # iOS
npm run web      # Web
```

## API Endpoints được sử dụng

- `GET /products` - Lấy danh sách sản phẩm
- `GET /products/{id}` - Lấy chi tiết sản phẩm
- `GET /products/category/{category}` - Lấy sản phẩm theo danh mục
- `GET /products/search?q={query}` - Tìm kiếm sản phẩm
- `GET /products/categories` - Lấy danh sách danh mục

## Công nghệ sử dụng

- **React Native** - Framework mobile
- **Expo Router** - Navigation
- **Redux Toolkit** - State management
- **TanStack Query** - Server state management
- **Axios** - HTTP client
- **TypeScript** - Type safety
- **Expo Vector Icons** - Icons

## Tính năng nổi bật

### 🔄 Real-time Updates
- Giỏ hàng được cập nhật real-time
- Badge số lượng tự động cập nhật
- Tổng tiền tính toán tự động

### 📱 Mobile-First Design
- Responsive cho mọi kích thước màn hình
- Touch-friendly interactions
- Smooth animations và transitions

### 🛡️ Error Handling
- Comprehensive error handling
- User-friendly error messages
- Retry mechanisms

### ⚡ Performance
- Efficient caching với TanStack Query
- Optimized re-renders với Redux Toolkit
- Lazy loading và pagination

## Hướng dẫn sử dụng

1. **Xem sản phẩm**: Vào tab "Cửa hàng" để xem danh sách sản phẩm
2. **Chi tiết sản phẩm**: Tap vào sản phẩm để xem thông tin chi tiết
3. **Thêm vào giỏ**: Tap nút "Thêm vào giỏ" trên sản phẩm
4. **Quản lý giỏ hàng**: Vào tab "Giỏ hàng" để xem và chỉnh sửa
5. **Cập nhật số lượng**: Sử dụng nút +/- để thay đổi số lượng
6. **Xóa sản phẩm**: Tap icon thùng rác để xóa sản phẩm

## Lưu ý

- Ứng dụng sử dụng API công khai, có thể có giới hạn về tốc độ
- Dữ liệu được cache để tối ưu performance
- State được persist trong Redux store
- Hỗ trợ offline với cached data