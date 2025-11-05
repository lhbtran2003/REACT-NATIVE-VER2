# 📊 Logging API Products - Hướng dẫn

## ✅ **Đã thêm logging chi tiết:**

### 🔍 **Trong hooks/useProducts.ts:**

#### **useProducts:**
```typescript
console.log('🛒 Fetching products from API...');
console.log('✅ Products fetched successfully:', products);
console.log('📊 Total products:', products.length);
console.log('📋 Products list:', products.map(p => ({ id: p.id, title: p.title, price: p.price })));
```

#### **useProduct:**
```typescript
console.log(`🔍 Fetching product detail for ID: ${id}`);
console.log('✅ Product detail fetched successfully:', product);
console.log('📋 Product info:', {
  id: product.id,
  title: product.title,
  price: product.price,
  category: product.category,
  rating: product.rating
});
```

#### **useSearchProducts:**
```typescript
console.log(`🔍 Searching products with query: "${query}"`);
console.log('📊 Pagination: limit=${limit}, skip=${skip}');
console.log('✅ Search results fetched successfully:', result);
console.log('📊 Search stats:', {
  total: result.total,
  returned: result.products.length,
  skip: result.skip,
  limit: result.limit
});
```

### 🌐 **Trong services/api.ts:**

#### **getProducts:**
```typescript
console.log('🌐 Making API call to /products/all');
console.log('✅ API response received:', response.data);
console.log('📊 Response status:', response.status);
console.log('📋 Response headers:', response.headers);
```

#### **getProductById:**
```typescript
console.log(`🌐 Making API call to /products/${id}`);
console.log('✅ API response received:', response.data);
console.log('📊 Response status:', response.status);
```

#### **searchProducts:**
```typescript
console.log(`🌐 Making API call to /products/search-paging?${params.toString()}`);
console.log('✅ API response received:', response.data);
console.log('📊 Response status:', response.status);
```

## 🎯 **Cách xem logs:**

### **1. Metro Bundler Console:**
- Mở terminal chạy `npm start`
- Xem logs trong Metro Bundler console
- Logs sẽ hiển thị khi gọi API

### **2. Browser DevTools (nếu test trên web):**
- Mở DevTools (F12)
- Vào tab Console
- Xem logs khi gọi API

### **3. React Native Debugger:**
- Cài đặt React Native Debugger
- Mở app và enable debugging
- Xem logs trong Debugger console

## 📋 **Các loại logs:**

### **🛒 Product Fetching:**
- Khi load danh sách sản phẩm
- Hiển thị tổng số sản phẩm
- Danh sách sản phẩm với id, title, price

### **🔍 Product Detail:**
- Khi xem chi tiết sản phẩm
- Hiển thị thông tin đầy đủ sản phẩm
- ID, title, price, category, rating

### **🔍 Search Results:**
- Khi tìm kiếm sản phẩm
- Hiển thị query, pagination
- Thống kê kết quả tìm kiếm

### **🌐 API Calls:**
- Khi gọi API thực tế
- Hiển thị URL, response, status
- Headers và error details

## 🚀 **Test logging:**

### **1. Load Products:**
- Vào tab "Sản phẩm"
- Xem logs trong console
- Sẽ thấy: 🛒 Fetching products...

### **2. View Product Detail:**
- Tap vào sản phẩm
- Xem logs trong console
- Sẽ thấy: 🔍 Fetching product detail...

### **3. Search Products:**
- Sử dụng tính năng tìm kiếm
- Xem logs trong console
- Sẽ thấy: 🔍 Searching products...

## ✅ **Kết quả:**

- ✅ **Detailed logging** → Logs chi tiết cho mọi API call
- ✅ **Easy debugging** → Dễ dàng debug API issues
- ✅ **Performance monitoring** → Theo dõi performance
- ✅ **Error tracking** → Track errors và fallbacks

**Bây giờ bạn có thể xem chi tiết tất cả API calls và responses!** 🎉
