# Sửa lỗi quay video - Hướng dẫn

## Vấn đề
Lỗi: "Không thể quay video: Error: Call to function 'ExpoCamera.record' has been rejected. → Caused by: Missing permissions: android.permission.RECORD_AUDIO"

## Nguyên nhân
Thiếu quyền `android.permission.RECORD_AUDIO` để ghi âm khi quay video.

## Giải pháp đã áp dụng

### 1. Cập nhật app.json
- Thêm `microphonePermission` vào cấu hình expo-camera
- Thêm `recordAudioAndroid: true` để enable quyền ghi âm trên Android
- Xóa cấu hình trùng lặp

### 2. Cập nhật code
- Thêm import `expo-av` để xử lý quyền microphone
- Thêm state `audioPermission` để track quyền microphone
- Cập nhật hàm `requestAllPermissions` để yêu cầu quyền microphone
- Cập nhật điều kiện hiển thị camera để yêu cầu đủ 3 quyền: camera, media library, microphone

## Các bước để áp dụng

### Bước 1: Rebuild app
```bash
# Xóa cache và rebuild
npx expo start --clear

# Hoặc nếu đang chạy development build
npx expo run:android --clear
```

### Bước 2: Cấp quyền
1. Mở app
2. Nhấn "Yêu cầu quyền truy cập"
3. Cấp quyền cho:
   - Camera
   - Thư viện ảnh
   - Microphone (quan trọng!)

### Bước 3: Test
1. Chuyển sang chế độ "Video"
2. Nhấn nút quay video
3. Video sẽ được quay với âm thanh

## Lưu ý quan trọng
- **Phải rebuild app** sau khi thay đổi app.json
- **Phải cấp quyền microphone** để quay video có âm thanh
- Nếu vẫn lỗi, kiểm tra cài đặt app trong Settings > Apps > ss20-media-camera > Permissions

## Cấu hình cuối cùng trong app.json
```json
{
  "expo": {
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Cho phép $(PRODUCT_NAME) sử dụng camera của bạn để chụp ảnh và quay video.",
          "microphonePermission": "Cho phép $(PRODUCT_NAME) sử dụng microphone để quay video có âm thanh.",
          "recordAudioAndroid": true
        }
      ]
    ],
    "android": {
      "permissions": [
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO"
      ]
    }
  }
}
```
