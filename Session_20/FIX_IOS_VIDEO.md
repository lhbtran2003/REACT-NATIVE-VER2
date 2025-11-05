# Sửa lỗi quay video trên iOS - Hướng dẫn

## Vấn đề
Không thể quay video trên iOS do thiếu quyền cần thiết.

## Nguyên nhân
iOS yêu cầu các quyền cụ thể trong `Info.plist` để:
- Truy cập camera
- Sử dụng microphone 
- Lưu ảnh/video vào thư viện

## Giải pháp đã áp dụng

### 1. Cập nhật app.json - iOS Permissions
```json
{
  "ios": {
    "infoPlist": {
      "NSCameraUsageDescription": "Cho phép $(PRODUCT_NAME) sử dụng camera để chụp ảnh và quay video.",
      "NSMicrophoneUsageDescription": "Cho phép $(PRODUCT_NAME) sử dụng micro để quay video có âm thanh.",
      "NSPhotoLibraryUsageDescription": "Cho phép $(PRODUCT_NAME) truy cập thư viện ảnh để lưu ảnh và video.",
      "NSPhotoLibraryAddUsageDescription": "Cho phép $(PRODUCT_NAME) lưu ảnh và video vào thư viện."
    }
  }
}
```

### 2. Cập nhật expo-camera plugin
```json
{
  "plugins": [
    [
      "expo-camera",
      {
        "cameraPermission": "Cho phép $(PRODUCT_NAME) sử dụng camera của bạn để chụp ảnh và quay video.",
        "microphonePermission": "Cho phép $(PRODUCT_NAME) sử dụng microphone để quay video có âm thanh.",
        "recordAudioAndroid": true,
        "recordAudioIOS": true
      }
    ]
  ]
}
```

### 3. Cải thiện code xử lý quyền
- Thêm error handling cho việc yêu cầu quyền
- Xử lý trường hợp không có quyền microphone (quay video không âm thanh)
- Thêm logging để debug
- Cấu hình video recording với options phù hợp

## Các bước để áp dụng

### Bước 1: Rebuild app cho iOS
```bash
# Xóa cache và rebuild
npx expo start --clear

# Hoặc nếu đang chạy development build
npx expo run:ios --clear
```

### Bước 2: Cấp quyền trên iOS
1. Mở app trên iOS
2. Nhấn "Yêu cầu quyền truy cập"
3. Cấp quyền cho:
   - Camera ✅
   - Thư viện ảnh ✅
   - Microphone ✅ (tùy chọn - nếu không cấp sẽ quay video không âm thanh)

### Bước 3: Test chức năng
1. Chuyển sang chế độ "Video"
2. Nhấn nút quay video
3. Video sẽ được quay (có hoặc không có âm thanh tùy theo quyền microphone)

## Tính năng mới

### 🎥 **Quay video linh hoạt:**
- **Có âm thanh**: Nếu có quyền microphone
- **Không âm thanh**: Nếu không có quyền microphone (vẫn quay được video)
- **Thông báo rõ ràng**: Hiển thị trạng thái âm thanh khi quay

### 🔧 **Cải thiện kỹ thuật:**
- Error handling tốt hơn
- Logging để debug
- Cấu hình video quality (720p)
- Giới hạn thời gian quay (60 giây)

## Lưu ý quan trọng

### 📱 **iOS Specific:**
- **Phải rebuild app** sau khi thay đổi Info.plist
- **Quyền NSPhotoLibraryAddUsageDescription** là bắt buộc để lưu video
- **Quyền microphone** là tùy chọn - app vẫn hoạt động nếu không có

### 🔍 **Debug:**
- Kiểm tra console logs để xem trạng thái quyền
- Nếu vẫn lỗi, kiểm tra Settings > Privacy & Security > Camera/Microphone/Photos

### ⚠️ **Troubleshooting:**
- Nếu video không lưu được: Kiểm tra quyền NSPhotoLibraryAddUsageDescription
- Nếu không quay được: Kiểm tra quyền NSCameraUsageDescription
- Nếu không có âm thanh: Kiểm tra quyền NSMicrophoneUsageDescription

## Kết quả
- ✅ Quay video hoạt động trên iOS
- ✅ Lưu video vào thư viện iOS
- ✅ Xử lý linh hoạt quyền microphone
- ✅ Giao diện thông báo rõ ràng
