# Sửa lỗi "Camera is not ready yet" trên iOS

## Vấn đề
Lỗi: `[Error: Camera is not ready yet. Wait for 'onCameraReady' callback]` khi test trên iOS.

## Nguyên nhân
Camera cần thời gian để khởi tạo và sẵn sàng. Khi cố gắng sử dụng camera (chụp ảnh/quay video) trước khi nó sẵn sàng, sẽ gây ra lỗi này.

## Giải pháp đã áp dụng

### 1. Thêm state tracking camera ready
```typescript
const [isCameraReady, setIsCameraReady] = useState(false);
```

### 2. Thêm onCameraReady callback
```typescript
<CameraView 
  ref={cameraRef} 
  style={styles.camera} 
  facing="front"
  onCameraReady={() => {
    console.log('Camera is ready');
    setIsCameraReady(true);
  }}
>
```

### 3. Kiểm tra camera ready trước khi sử dụng
```typescript
const takePicture = async () => {
  if (!isCameraReady) {
    Alert.alert('Thông báo', 'Camera chưa sẵn sàng. Vui lòng chờ một chút.');
    return;
  }
  // ... rest of the code
};
```

### 4. Thêm loading indicator
- Hiển thị "Đang khởi tạo camera..." khi camera chưa sẵn sàng
- Ẩn các nút chụp/quay khi camera chưa ready

## Cải tiến kỹ thuật

### 🔧 **Error Handling:**
- Kiểm tra `isCameraReady` trước mọi thao tác camera
- Thông báo rõ ràng cho người dùng
- Console logging để debug

### 🎨 **UI/UX:**
- Loading indicator khi camera đang khởi tạo
- Disable các nút khi camera chưa sẵn sàng
- Thông báo thân thiện với người dùng

### 📱 **iOS Specific:**
- Xử lý đặc biệt cho iOS camera initialization
- Tương thích với iOS camera permissions
- Optimized cho iOS performance

## Các bước để áp dụng

### Bước 1: Rebuild app
```bash
npx expo run:ios --clear
```

### Bước 2: Test chức năng
1. Mở app trên iOS
2. Chờ camera khởi tạo (sẽ thấy "Đang khởi tạo camera...")
3. Khi camera sẵn sàng, các nút sẽ hoạt động
4. Test chụp ảnh và quay video

### Bước 3: Debug nếu cần
- Kiểm tra console logs: "Camera is ready"
- Nếu vẫn lỗi, kiểm tra permissions
- Đảm bảo camera không bị block bởi app khác

## Kết quả

### ✅ **Trước khi sửa:**
- Lỗi "Camera is not ready yet"
- App crash khi chụp/quay ngay lập tức
- Không có feedback cho người dùng

### ✅ **Sau khi sửa:**
- Camera khởi tạo an toàn
- Loading indicator rõ ràng
- Error handling tốt
- Trải nghiệm người dùng mượt mà

## Lưu ý quan trọng

### ⏱️ **Timing:**
- Camera cần 1-3 giây để khởi tạo
- Luôn kiểm tra `isCameraReady` trước khi sử dụng
- Không nên gọi camera functions ngay sau khi mount

### 🔍 **Debug:**
- Console log "Camera is ready" khi thành công
- Kiểm tra permissions nếu camera không ready
- Test trên device thật, không chỉ simulator

### 📱 **iOS Specific:**
- iOS camera initialization chậm hơn Android
- Cần quyền camera và microphone đầy đủ
- Test trên iOS 15+ để đảm bảo tương thích
